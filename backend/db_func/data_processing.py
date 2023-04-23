from typing import Tuple, Union, overload, List, Iterable
import simplejson as json
from copy import copy, deepcopy

class Data:
#private:
    def __init__(self, header: Tuple[str], data: Tuple[tuple]) -> None:
        if len(data) and len(header)!=len(data[0]):
            raise ValueError("Length not match for header and data.")
        self.columns = list(header)
        self.__data = [list(dt) for dt in data]

    @overload
    def __getitem__(self, col:str): ...
    @overload
    def __getitem__(self, index: Union[slice,int]): ...

    def __getitem__(self, key: Union[slice,int]):
        # col_index = self.columns.index(col)
        if (not isinstance(key, str)):
            if isinstance(key, slice):
                return Data(copy(self.columns), deepcopy(self.__data.__getitem__(key)))
            else:
                return self.__data[key]
        else:
            idx = self.columns.index(key)
            return [line[idx] for line in self.__data]

    def __repr__(self) -> str:
        return self.__str__()

    def __str__(self) -> str:
        sep = "\t"
        return sep.join([str(i) for i in self.columns]) + "\n" + "\n".join(
            map(lambda x: sep.join([str(i) for i in x]), self.__data)
        )

#public:
    columns : List[str]

    def drop(self, col: str):
        """INPLACELY!!! drop all columns matches the name `col`.

        Args:
            col (str): column name to be dropped.
        """
        if (col not in self.columns):
            raise ValueError(f"column name '{col}' not found.")
        indices = [i for i in range(len(self.columns)) if self.columns[i] == col]
        indices.sort(reverse=False)
        for i in indices:
            self.columns.pop(i)
        for line in self.__data:
            for i in indices:
                line.pop(i)

    def rename(self, col:str, new_name:str):
        try:
            idx = self.columns.index(col)
            self.columns[idx] = new_name
        except Exception:
            print("Warning: rename failed. ")

    @overload
    def append(self, col_name: str, col: Iterable):
        """Append a new column on the right.

        Returns:
            col_name(str): name of new colume
            col(tuple): data of new column
        """
        ...

    @overload
    def append(self, record: Iterable):
        """Append record at buttom.

        Args:
            record (tuple): _description_
        """
        ...

    def append(self, args1, args2=None):
        if (args2):
            if (len(args2)!=len(self.__data)):
                raise ValueError("The size of col does not match.")
            list(map(lambda x,y: x.append(y), self.__data, args2))
            self.columns.append(args1)
        else:
            if (len(args1)!=len(self.__data[0])):
                raise ValueError("The size of row does not match.")
            self.__data.append(list(args1))

    def json(self) -> str:
        """Return the json string of the data by row.

        Returns:
            str: string in Json format.
        """
        data = [dict(zip(self.columns,
                record)) for record in self.__data]
        if (len(data)==1): return json.dumps(data[0])
        else: return json.dumps(data)

    @property
    def values(self) -> Tuple[tuple]:
        return deepcopy(self.__data)

if __name__ == "__main__":
    obj = Data(('h','e'),((1,2), (2,3), (3,4)))
    print(obj.columns)
    obj.append((2,5))
    obj.append('r', (2,3,4,5))
    print(obj.json())
