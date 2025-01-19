import React from "react";

const FeesTable = ({ totalUnits }) => {
  return (
    <table className="fees">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-green font-bold">Laboratory Fees</td>
          <td className="text-green font-bold">Other Fees</td>
          <td className="text-green font-bold">Assessment</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>
            <table className="table-border-hidden">
              <tr>
                <td className="text-green font-bold">Total UNITS:</td>
                <td>{totalUnits}</td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FeesTable;
