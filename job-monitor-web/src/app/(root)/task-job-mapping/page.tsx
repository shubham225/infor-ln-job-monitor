"use client";

import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { companies } from "@/lib/mock-data";
import {ServerMapping } from "@/types/api";
// import { columns } from "./columns";


const data: ServerMapping[] = [
  {
    id: "#123",
    hostname: "Localhost",
    apiUrl: "http://localhost:8080/api",
  },
  {
    id: "#124",
    hostname: "Localhost1",
    apiUrl: "http://localhost1:8080/api",
  },
  {
    id: "#125",
    hostname: "Localhost2",
    apiUrl: "http://localhost2:8080/api",
  },
  {
    id: "#126",
    hostname: "Localhost3",
    apiUrl: "http://localhost3:8080/api",
  },
  {
    id: "#127",
    hostname: "Localhost4",
    apiUrl: "http://localhost4:8080/api",
  },
  {
    id: "#128",
    hostname: "Localhost5",
    apiUrl: "http://localhost5:8080/api",
  }
];  

export default function CompaniesPage() {
  return (
    <div >
        <DataTable
          columns={columns}
          data={companies}
          title="Table View"
          pageSize={10}
          onSelectionChange={(rows) => console.log("selected:", rows)}
        />
    </div>
  );
}