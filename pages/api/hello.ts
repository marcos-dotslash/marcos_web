// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/dbconnect";
import Temp from "@/models/templates";

type Data = {
  components: object
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let components = [{
    id: 1,
    htmlCode : '<div class="topnav"><a class="active" href="#home">Home</a>\n' +
    '<a href="#">News</a>\n' +
    '<a href="#">Contact</a>\n' +
    '<a href="#">About</a>\n' +
    '</div>\n',
    cssCode: 'body {\n' +
    'margin: 0;\n' +
    'font-family: Arial, Helvetica, sans-serif;\n' +
    '}\n' +
    '.topnav {\n' +
    'overflow: hidden;\n' +
    'background-color: #333;\n' +
    '}\n' +
    '.topnav a {\n' +
    'float: left;\n' +
    'color: #f2f2f2;\n' +
    'text-align: center;\n' +
    'padding: 14px 16px;\n' +
    'text-decoration: none;\n' +
    'font-size: 17px;\n' +
    '}\n' +
    '.topnav a:hover {\n' +
    'background-color: #ddd;\n' +
    'color: black;\n' +
    '}\n' +
    '.topnav a.active {\n' +
    'background-color: #04AA6D;\n' +
    'color: white;\n' +
    '}\n'
  },
  {
    id: 2,
    htmlCode: "<div class=\"navbar\">\n" +
    "    <a href=\"#home\">Home</a>\n" +
    "    <div class=\"subnav\">\n" +
    "        <button class=\"subnavbtn\">About <i class=\"fa fa-caret-down\"></i></button>\n" +
    "        <div class=\"subnav-content\">\n" +
    "            <a href=\"#company\">Company</a>\n" +
    "            <a href=\"#team\">Team</a>\n" +
    "            <a href=\"#careers\">Careers</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"subnav\">\n" +
    "        <button class=\"subnavbtn\">Services <i class=\"fa fa-caret-down\"></i></button>\n" +
    "        <div class=\"subnav-content\">\n" +
    "            <a href=\"#bring\">Bring</a>\n" +
    "            <a href=\"#deliver\">Deliver</a>\n" +
    "            <a href=\"#package\">Package</a>\n" +
    "            <a href=\"#express\">Express</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"subnav\">\n" +
    "        <button class=\"subnavbtn\">Partners <i class=\"fa fa-caret-down\"></i></button>\n" +
    "        <div class=\"subnav-content\">\n" +
    "            <a href=\"#link1\">Link 1</a>\n" +
    "            <a href=\"#link2\">Link 2</a>\n" +
    "            <a href=\"#link3\">Link 3</a>\n" +
    "            <a href=\"#link4\">Link 4</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <a href=\"#contact\">Contact</a>\n" +
    "</div>\n" +
    "<div style=\"padding:0 16px\">\n" +
    "    <h3>Subnav/dropdown menu inside a Navigation Bar</h3>\n" +
    "    <p>Hover over the \"about\", \"services\" or \"partners\" link to see the sub navigation menu.</p>\n" +
    "</div>",
    cssCode : "body {\n" +
    "  font-family: Arial, Helvetica, sans-serif;\n" +
    "  margin: 0;\n" +
    "}\n" +
    "\n" +
    ".navbar {\n" +
    "  overflow: hidden;\n" +
    "  background-color: #333; \n" +
    "}\n" +
    "\n" +
    ".navbar a {\n" +
    "  float: left;\n" +
    "  font-size: 16px;\n" +
    "  color: white;\n" +
    "  text-align: center;\n" +
    "  padding: 14px 16px;\n" +
    "  text-decoration: none;\n" +
    "}\n" +
    "\n" +
    ".subnav {\n" +
    "  float: left;\n" +
    "  overflow: hidden;\n" +
    "}\n" +
    "\n" +
    ".subnav .subnavbtn {\n" +
    "  font-size: 16px;  \n" +
    "  border: none;\n" +
    "  outline: none;\n" +
    "  color: white;\n" +
    "  padding: 14px 16px;\n" +
    "  background-color: inherit;\n" +
    "  font-family: inherit;\n" +
    "  margin: 0;\n" +
    "}\n" +
    "\n" +
    ".navbar a:hover, .subnav:hover .subnavbtn {\n" +
    "  background-color: red;\n" +
    "}\n" +
    "\n" +
    ".subnav-content {\n" +
    "  display: none;\n" +
    "  position: absolute;\n" +
    "  left: 0;\n" +
    "  background-color: red;\n" +
    "  width: 100%;\n" +
    "  z-index: 1;\n" +
    "}\n" +
    "\n" +
    ".subnav-content a {\n" +
    "  float: left;\n" +
    "  color: white;\n" +
    "  text-decoration: none;\n" +
    "}\n" +
    "\n" +
    ".subnav-content a:hover {\n" +
    "  background-color: #eee;\n" +
    "  color: black;\n" +
    "}\n" +
    "\n" +
    ".subnav:hover .subnav-content {\n" +
    "  display: block;\n" +
    "}"
  }
]

  res.status(200).json({ components });
}