from flask import Flask, redirect, request, url_for, session
import os
from query_handler import *
from db_func import DataBase
from flask_cors import CORS


# create app
app = Flask(__name__)
CORS(app)

# get database instance
os.chdir(os.path.dirname(os.path.abspath(__file__)))
with open("./config.json") as f:
    login_info = json.load(f)
db = DataBase(**login_info)

# define api nodes
@app.route("/")
def root():
    return "<div> Root Page </div>"


@app.route("/test")  # accept: {**kwargs: Any}
def test():
    sql = test_sql(request.query_string)
    data = db.query(sql)
    return data.json()


@app.route("/description")  # accept: {code: int}
def description():
    sql = description_sql(request.query_string)
    data = db.query(sql)
    return data.json()


@app.route("/recommandation")  # accept: {district: int}
def recommandation():
    sql = recommendation_sql(request.args)
    data = db.query(sql)
    data.rename("increase_ratio", "ratio")
    data.append("rank", range(1, 6))
    return '{"recommandations": ' + data.json() + "}"
    # {"recommandations": [
    #    {"name": string,
    #     "code": int,
    #     "ratio": float,
    #     "net_increase", "rank": int},
    #    ...
    # ]}


@app.route("/active_data")
# accept: {district: int, num: int,
#           start: optional("yyyy"| "yyyy/q" | undefined),
#           end: option("yyyy"| "yyyy/q" | undefined),
#           code: int}
# url = /active_data?district=1&startTime=2015%2F1&endTime=2018%2F2&num=5&code=5311
def trend():
    highlight = 0
    max_rank = 0xff;
    if ("num" in request.args):
        max_rank = int(request.args["num"])
    if "code" in request.args:
        highlight =  request.args["code"]

    sql = trend_sql(request.args)
    data = db.query(sql)
    return trend_data_process(data, highlight, max_rank)
    #    {
    #         "time": ["2015/01", "2015/02", "2015/03", "2015/04", "2016/01", "2016/02"],
    #         "industries": [
    #             {"name": "Lessors of Real Estate",
    #              "code": "5311",
    #              "active": [1234, 1235, 2935, 1928, 1203, 1290],
    #              "close": [1234, 1235, 2935, 1928, 1203, 1290],
    #              "net_change": [1234, 1235, 2935, 1928, 1203, 1290],
    #              "change_rate": [1234, 1235, 2935, 1928, 1203, 1290],
    #              "rank": int,
    #             },
    #             ...
    #         ],
    #     }


@app.route("/change_ratio") # refer to /active_data
def ratio():
    return redirect(url_for(".trend", **request.args));


@app.route("/active_pred") # accept: {num: int}
def active_pred():
    sql = active_pred_sql(request.args);
    data = db.query(sql);
    return json.dumps(dict(data._Data__data))
    # return data.json()

@app.route("/capacity") # accept: {distrcit: int|"LA", code: Optional[int]}
def get_capacity():
    sql = get_capacity_sql(request.args)
    data = db.query(sql)
    return data.json()



@app.route("/anynode")  # accept: {**kwargs: any}
def node():
    ...


if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    # app.debug = True
    app.run()
