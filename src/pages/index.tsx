import React, { useCallback, useEffect, useRef, useState } from "react";

import { useAsyncLaunches } from "../hooks/useListLaunches";
import { LaunchCard } from "../components/launchCard";
import styled from "styled-components";
import { Launch } from "../types/launch";
import Select from "react-select";

const options = [
  { value: "successful", label: "Successful launch" },
  { value: "failure", label: "failure launch" },
];

const yearsOfLaunches = [
  { value: "Old", label: "Old launches (<2021)" },
  { value: "Latest", label: "Latest launches" },
];

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 12px;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
  }

  @media only screen and (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 24px;
  }
`;

const Filter = styled.div`
  display: block;
  width: 256px;
`;

export const MainPage = () => {
  const [offset, setOffset] = useState(0);

  const [query, setQuery] = useState<any>("");
  const { loaded, list } = useAsyncLaunches(offset, query);
  const loader = useRef(null);

  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[offset];
      if (target?.isIntersecting) {
        setOffset((prev) => prev + 12);
      }
    },
    [offset]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  const [name, setName] = useState("");

  const handleSearchLaunch = () => {
    if (name.length > 2) {
      setQuery({
        query: !!name
          ? {
              $text: {
                $search: name,
              },
            }
          : null,
      });
    }
  };

  const handleFilterBySuccessLaunch = (selectedOption: any) => {
    setQuery({
      success: Boolean(selectedOption.value),
    });
  };

  const handleFilterByYears = (selectedOption: any) => {
    setQuery(
      selectedOption.value === "Latest"
        ? {
            date_utc: {
              $gte: "2021-01-01T00:00:00.000Z",
            },
          }
        : {
            date_utc: {
              $lte: "2021-01-01T00:00:00.000Z",
            },
          }
    );
  };

  return (
    <div>
      <Filter>
        <p> Search by name:</p>
        <form onSubmit={handleSearchLaunch}>
          <input
            type="search"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type="submit" />
        </form>
      </Filter>

      <Filter>
        <p>Filter by success launch</p>
        <Select options={options} onChange={handleFilterBySuccessLaunch} />
      </Filter>
      <Filter>
        <p>Filter old / latest launches</p>
        <Select options={yearsOfLaunches} onChange={handleFilterByYears} />
      </Filter>

      <Container>
        {list.map((launch: Launch) => {
          return <LaunchCard launch={launch} key={launch.id} />;
        })}
        <div ref={loader} />
        {loaded && <p>Data loading...</p>}
      </Container>
    </div>
  );
};
