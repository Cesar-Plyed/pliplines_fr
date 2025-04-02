import { useMemo } from "react";
import { getData, Error } from "../api/api";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { AutoSizer, List } from "react-virtualized";
import { SetStateAction } from "react";

export default function Menu() {
  const {
    data: menuData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const result = { drinks: [], foods: [] };
      await getData(
        (drinks: SetStateAction<any[]>) => {
          result.drinks = drinks as never[];
        },
        (foods: SetStateAction<any[]>) => {
          result.foods = foods as never[];
        },
        (error) => {
          throw error;
        }
      );
      return result;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const items = useMemo(
    () => (menuData ? [...menuData.drinks, ...menuData.foods] : []),
    [menuData]
  );

  if (isLoading) {
    return (
      <div className="w-full h-full grid place-content-center">
        <CircularProgress />
      </div>
    );
  }

  const ITEMS_PER_ROW = 5; // Número de items por fila

  const rowRenderer = ({
    index,
    key,
    style,
  }: {
    index: number;
    key: string;
    style: React.CSSProperties;
  }) => {
    const fromIndex = index * ITEMS_PER_ROW;
    const toIndex = Math.min(fromIndex + ITEMS_PER_ROW, items.length);
    const rowItems = items.slice(fromIndex, toIndex);

    return (
      <div
        key={key}
        style={{
          ...style,
          display: "grid",
          gridTemplateColumns: `repeat(${ITEMS_PER_ROW}, 1fr)`,
          width: "100%",
        }}
      >
        {rowItems.map((item) => (
          <MenuItem key={(item as { id: string }).id} item={item} />
        ))}
      </div>
    );
  };

  return (
    <main className="w-full h-full">
      <Error error={error?.message || null} />
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            width={width}
            height={window.innerHeight - 145}
            rowCount={Math.ceil(items.length / ITEMS_PER_ROW)}
            rowHeight={350}
            rowRenderer={rowRenderer}
            overscanRowCount={5}
          />
        )}
      </AutoSizer>
    </main>
  );
}
