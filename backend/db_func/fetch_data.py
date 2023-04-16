from typing import Tuple, Union
import pymysql
from sympy import false
from .data_processing import Data
from multiprocessing import Lock

class DataBase:
#private:
    __last_status = 0;
    __is_alive = False;
    lock = Lock()
    conn_param = {}
    __call_count = 0

    def __init__(self, host, user, password, database, port):
        self.conn_param = {"host": host, "user":user, "password":password,
                 "database": database, "port": port}
        self.__new_conn()

    def __del__(self):
        try:
            if (self.__is_alive):
                self.__conn.close()
        except Exception:
            ...

    def __new_conn(self):
        self.__conn = pymysql.connect(**self.conn_param)
        self.__cursor = self.__conn.cursor()
        self.__is_alive = True

    def __query(self, query_string: str, fetch_length: int = -1) -> Tuple[tuple]:
        try:
            self.__cursor.execute(query=query_string)
            self.__last_status = 0;
            self.__call_count = 0;
        except Exception as e:
            print(f"Warning: {e.args[0]} - {e.args[1]}")
            self.__last_status = e.args[0];
            if (e.args[0] == 2006 and self.__call_count<3):
                self.__call_count += 1
                print("Reconnecting...")
                self.__cursor.close()
                self.__new_conn()
                return self.__query(query_string, fetch_length)
            else: return ();
        if fetch_length == -1:
            return self.__cursor.fetchall()
        else:
            return self.__cursor.fetchmany(fetch_length)

#public:
    def query(self, query_string: str, fetch_length: int=-1) -> Data:
        self.lock.acquire()
        data = self.__query(query_string, fetch_length)
        if (not self.__cursor.description): header = ()
        else: header = [i[0] for i in self.__cursor.description]
        self.lock.release()
        return Data(header, data)

    def close_conn(self) -> None:
        self.__is_alive = False
        self.__conn.close()

    @property
    def last_status(self):
        return self.__last_status

    @property
    def is_alive(self):
        return self.__is_alive
