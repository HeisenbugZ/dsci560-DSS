from gc import disable
from db_func import Data, json
import pandas as pd

# This file is to define backend engine function
# each sql function returns a sql string
# each processing function returns a Data object

def extract_param(query: bytes) -> dict:
    query = query.decode()
    form_content = dict(i.split('=') for i in query.split('&'))
    return form_content

def test_sql(query: bytes) -> str:
    query = extract_param(query)
    ...
    sql = "select {} from {} where {}"
    ...
    cols = '*'
    table = 'test'
    where = '1'
    return sql.format(cols, table, where);

def description_sql(query: bytes) -> str:
    query = extract_param(query)
    if ('code' not in query):
        return ";"
    else:
        return f"select * from industry where code={query['code']}"

def recommendation_sql(query: bytes) -> str:
    froms = "from (predict right JOIN industry on predict.code = industry.code)"
    where = "where 1 "
    group = ""
    order = "ORDER BY increase_ratio desc limit 5"
    if ('district' not in query): return ";"
    elif (query["district"]=='LA'):
        select = "name, predict.code, sum(net_increase) AS net_increase, sum(net_increase)/sum(`value`)*100  AS increase_ratio"
        group = "GROUP BY predict.code, name"
    else:
        select = "name, predict.code, net_increase, increase_ratio"
        where += f"and district={str(query['district'])}"
    return f"select {select} {froms} {where} {group} {order}"

def trend_sql(query: bytes) -> str:
    select = ""
    order = "order by code, date "
    froms = "from per_year_pred right join total_rank on per_year_pred.code=total_rank.code"
    where = "where 1 "
    group = ""
    if ('start' in query): where += f"and date>='{query['start']}' "
    if ('end' in query): where += f"and date<='{query['end']}' "
    # if ('num' in query): where += f"and ranky <= {query['num']} "

    if ('district' not in query): return ";"
    elif (query["district"] != "LA") :
        select = "name, per_year_pred.date, per_year_pred.code, active, close, net_change, change_rate, ranky"
        where += f"and district={query['district']} "
    else:
        select ="name, per_year_pred.date, per_year_pred.code, sum(active) as active,\
            sum(close) as close, sum(net_change) as net_change, sum(net_change)/sum(close) as change_rate, ranky"
        group = "group by per_year_pred.code, per_year_pred.date, name "

    return f"SELECT {select} {froms} {where} {group} {order};"

def active_pred_sql(query: bytes) ->str:
    return """select district, sum(value) as total from predict
                group by district
                ORDER BY district"""

def get_capacity_sql(query: bytes) ->str:
    sql = f"""select sum(value-net_increase) as prev, sum(value) as pred, sum(net_increase) as capacity
                from predict """
    where = "where 1 "
    # group = ["code","district"]
    if (query["district"]!="LA"):
        where += f"and district={query['district']} "
    if ("code" in query):
        where += f"and code={query['code']}"
    return f"{sql} {where}"


def api_node_sql_2(query: bytes) -> str: ...
def api_node_sql_3(query: bytes) -> str: ...
...
...

def rank_process(x: int, highlight: int):
    if x == highlight: return 0
    elif x > highlight: return x - 1
    else: return x

def trend_data_process(data: Data, highlighted: int, max_rank: int) -> str:
    if not len(data.columns): return "[]"
    data.rename("ranky", "rank");
    date = sorted(list(set(data["date"])))
    df = pd.DataFrame(data._Data__data, columns=data.columns)
    df = df.groupby(["code", "name", "rank"]).agg(list).reset_index()
    ranks = df[df.code == int(highlighted)]["rank"]
    if (ranks.shape[0]):
        ranks = int(ranks.mean())
        ranksArray = df["rank"].apply(lambda x: rank_process(x, ranks))
        df["rank"] = ranksArray
    elif highlighted:
        return '{ "error" : ' +f'"Code Not exists: {highlighted}"' + '}'

    df = df[df["rank"]<=max_rank]
    data = Data(df.columns, df.values)
    data.drop("date")
    return '{' + f''' "time": {json.dumps(date)},
                      "industries": {data.json()} ''' +'}'


def api_node_data_proc_1(data: Data) -> Data: ...