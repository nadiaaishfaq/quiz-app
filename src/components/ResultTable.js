import React, { useEffect } from "react";
import { getServerData } from "../helper/helper"

export default function ResultTable() {

  useEffect(()=>{
    getServerData("http://localhost:5000/api/result")
  })
  return (
    <>
      <div>
        <table>
          <thead className="table-header">
            <tr className="table-row">
                <td>Name</td>
                <td>Attempts</td>
                <td>Earned Points</td>
                <td>Result</td>
            </tr>
          </thead>
          <tbody>
            <tr className="table-body">
                <td>nadia ishfaq</td>
                <td>3</td>
                <td>10</td>
                <td>Passed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
