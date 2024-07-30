"use client";

import { useEffect, useState } from "react";
import { Advocate } from "@/db/schema";
import debounce from 'lodash.debounce';

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [search, setSearch] = useState("");

  // @todo we should paginate this thing
  useEffect(debounce(() => {
    console.log("fetching advocates...");
    const url = new URL("/api/advocates", window.location.toString());
    url.searchParams.set("count", "20");
    if (search !== "") {
      url.searchParams.set("q", search);
    }
    fetch(url).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, 500), [search]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClick = () => setSearch("");

  return (
    <main className="m-6 prose">
      <h1>Solace Advocates</h1>
      <div className="border pb-2 pl-2 pr-2">
        <p>
          Searching for: <span id="search-term">{search}</span>
        </p>
        <input className="border border-black border-solid" onChange={onChange} value={search} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <table className="table-auto border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600">First Name</th>
            <th className="border border-slate-600">Last Name</th>
            <th className="border border-slate-600">City</th>
            <th className="border border-slate-600">Degree</th>
            <th className="border border-slate-600">Specialties</th>
            <th className="border border-slate-600">Years of Experience</th>
            <th className="border border-slate-600">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td className="border border-slate-700">{advocate.firstName}</td>
                <td className="border border-slate-700">{advocate.lastName}</td>
                <td className="border border-slate-700">{advocate.city}</td>
                <td className="border border-slate-700">{advocate.degree}</td>
                <td className="border border-slate-700">
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td className="border border-slate-700">{advocate.yearsOfExperience}</td>
                <td className="border border-slate-700">{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
