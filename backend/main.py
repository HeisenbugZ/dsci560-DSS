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
# url = /active_data?district=1&start=2015%2F1&end=2018%2F2&num=5&code=5311
def trend():
    highlight = 0
    max_rank = 0xFF
    if "num" in request.args:
        max_rank = int(request.args["num"])
    if "code" in request.args:
        highlight = request.args["code"]

    sql = trend_sql(request.args)
    data = db.query(sql)
    return trend_data_process(data, highlight, max_rank)


@app.route("/change_ratio")  # refer to /active_data
def ratio():
    return redirect(url_for(".trend", **request.args))


@app.route("/active_pred")  # accept: {num: int}
def active_pred():
    sql = active_pred_sql(request.args)
    data = db.query(sql)
    return json.dumps(dict(data._Data__data))
    # return data.json()


@app.route("/capacity")  # accept: {distrcit: int|"LA", code: Optional[int]}
def get_capacity():
    sql = get_capacity_sql(request.args)
    data = db.query(sql)
    return data.json()


@app.route("/eco_data")
# accept: { code: int,
#           num: int,
#           start: optional("yyyy"|"yyyy/q"|undefined)
#           end: optional("yyyy"|"yyyy/q"|undefined) }
# code 和 num 需使用且仅能使用其中一个
# code返回指定code数据， num=n返回rank前n的数据。
def get_economics():
    sql = economics_sql(request.args)
    if "error" in sql:
        return sql
    data = db.query(sql)
    return economics_data_process(data)

# { "time": ["2020/1", "2020/2", "2020/3", "2020/4", "2021/1", "2021/2", "2021/3", "2021/4", "2022/1", "2022/2"], '
#   "industries": {
#       "code": 611,
#       "rank": 2,
#       "wages": [6042900066, 6089426586, 5574588116, 6128953197, 5931729869, 6241743867, 6021705134, 6912228910, 6735436283, 6887865260],
#       "contribution": [10830954, 1598500, 1624815, 1217867, 8940182, 2043164, 2271894, 1990743, 9125857, 2133966],
#       "wage_change": [0.0385632, -0.017019, 0.0184101, -0.0244136, -0.0183968, 0.0250134, 0.0802063, 0.127799, 0.135493, 0.103516],
#       "contribution_change": [-0.0175817, -0.353549, -0.410135, -0.331454, -0.174571, 0.278176, 0.398248, 0.634614, 0.0207686, 0.0444419]
#   } }


@app.route("/district_info")  # accept: {district: int}
def district_info():
    query = request.args
    if ("district" not in query): return '{"error": "district parameter is mandatory."}'
    sql = f"select description from district_desc where district={query['district']}"
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
