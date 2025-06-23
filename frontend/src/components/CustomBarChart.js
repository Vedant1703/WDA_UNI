import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import styled from "styled-components";
import { Box } from '@mui/material';

// Styled tooltip components
const CustomTooltip = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const TooltipText = styled.p`
  margin: 0;
  font-weight: bold;
  color: #1e1e1e;
`;

const TooltipMain = styled.h2`
  margin: 0;
  font-weight: bold;
  color: #000000;
`;

// Tooltip content
const CustomTooltipContent = ({ active, payload, dataKey }) => {
  if (active && payload && payload.length) {
    const { subject, attendancePercentage, totalClasses, attendedClasses, marksObtained, subName } = payload[0].payload;

    return (
      <CustomTooltip>
        {dataKey === "attendancePercentage" ? (
          <>
            <TooltipMain>{subject}</TooltipMain>
            <TooltipText>Attended: ({attendedClasses}/{totalClasses})</TooltipText>
            <TooltipText>{attendancePercentage}%</TooltipText>
          </>
        ) : (
          <>
            <TooltipMain>{subName.subName}</TooltipMain>
            <TooltipText>Marks: {marksObtained}</TooltipText>
          </>
        )}
      </CustomTooltip>
    );
  }

  return null;
};

// Helper to generate distinct colors
const generateDistinctColors = (count) => {
  const colors = [];
  const goldenRatioConjugate = 0.618033988749895;

  for (let i = 0; i < count; i++) {
    const hue = (i * goldenRatioConjugate) % 1;
    const color = hslToRgb(hue, 0.6, 0.6);
    colors.push(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
  }

  return colors;
};

// HSL to RGB converter
const hslToRgb = (h, s, l) => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

// Main component
const CustomBarChart = ({ chartData, dataKey, sidebarOpen }) => {
  const subjects = chartData.map((data) => data.subject || (data.subName && data.subName.subName));
  const distinctColors = generateDistinctColors(subjects.length);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        left: sidebarOpen ? 200 : 16,  // Adjust left position based on sidebar
        backgroundColor: '#1a2b55',
        borderRadius: 2,
        padding: 2,
        paddingX: 10,
        transition: 'left 0.3s ease-in-out',
        zIndex: 0
      }}
    >
      <BarChart
        width={600}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
      >
        <XAxis
          dataKey={dataKey === "marksObtained" ? "subName.subName" : "subject"}
          tick={{ fill: '#ffffff', fontWeight: 600 }}
          axisLine={{ stroke: '#ffffff' }}
          tickLine={{ stroke: '#ffffff' }}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: '#ffffff', fontWeight: 600 }}
          axisLine={{ stroke: '#ffffff' }}
          tickLine={{ stroke: '#ffffff' }}
        />
        <Tooltip
          content={<CustomTooltipContent dataKey={dataKey} />}
          wrapperStyle={{ backgroundColor: '#2c3e50', borderRadius: 4, color: '#fff' }}
          cursor={{ fill: 'rgba(255,255,255,0.1)' }}
        />
        <Bar dataKey={dataKey} radius={[8, 8, 0, 0]}>
          {(chartData || []).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={distinctColors[index]} />
          ))}
        </Bar>
      </BarChart>
    </Box>
  );
};

export default CustomBarChart;






// // import React from "react";
// // import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

// // const chartData = [
// //     {
// //         name: "Amphibians",
// //         value: 2488,
// //     },
// //     {
// //         name: "Birds",
// //         value: 1445,
// //     },
// //     {
// //         name: "Crustaceans",
// //         value: 743,
// //     },
// // ];

// // const dataFormatter = (value) => {
// //     return "$ " + Intl.NumberFormat("us").format(value).toString();
// // };
// // const CustomBarChart = () => {
// //     return (
// //         <BarChart width={500} height={300} data={chartData}>
// //             <XAxis dataKey="name" />
// //             <YAxis />
// //             <Tooltip formatter={dataFormatter} />
// //             <Bar dataKey="value" fill="blue" />
// //         </BarChart>
// //     );
// // };

// // export default CustomBarChart

// // import React from "react";
// // import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
// // import styled from "styled-components";

// // const chartData = [
// //     {
// //         subject: "Math",
// //         attendancePercentage: 80,
// //         totalClasses: 50,
// //         attendedClasses: Math.round((80 / 100) * 50),
// //     },
// //     {
// //         subject: "Science",
// //         attendancePercentage: 90,
// //         totalClasses: 60,
// //         attendedClasses: Math.round((90 / 100) * 60),
// //     },
// //     {
// //         subject: "History",
// //         attendancePercentage: 70,
// //         totalClasses: 45,
// //         attendedClasses: Math.round((70 / 100) * 45),
// //     },
// // ];

// // const CustomTooltip = styled.div`
// //   background-color: #fff;
// //   border-radius: 4px;
// //   padding: 10px;
// //   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
// // `;

// // const TooltipText = styled.p`
// //   margin: 0;
// //   font-weight: bold;
// // `;

// // const CustomTooltipContent = ({ active, payload }) => {
// //     if (active && payload && payload.length) {
// //         const { subject, attendancePercentage, totalClasses, attendedClasses } = payload[0].payload;

// //         return (
// //             <CustomTooltip>
// //                 <TooltipText>{subject}</TooltipText>
// //                 <TooltipText>Attendance: {attendancePercentage}%</TooltipText>
// //                 <TooltipText>Attended Classes: {attendedClasses}</TooltipText>
// //                 <TooltipText>Total Classes: {totalClasses}</TooltipText>
// //             </CustomTooltip>
// //         );
// //     }

// //     return null;
// // };

// // const colors = ["#0088FE", "#00C49F", "#FFBB28"];

// // const CustomBarChart = () => {
// //     return (
// //         <BarChart width={500} height={300} data={chartData}>
// //             <XAxis dataKey="subject" />
// //             <YAxis />
// //             <Tooltip content={<CustomTooltipContent />} />
// //             <Bar dataKey="attendancePercentage">
// //                 {chartData.map((entry, index) => (
// //                     <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
// //                 ))}
// //             </Bar>
// //         </BarChart>
// //     );
// // };

// // export default CustomBarChart;

// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
// import styled from "styled-components";
// import { Box } from '@mui/material';
// import { useState } from "react";
// import SideBar from "../pages/admin/SideBar";

// const CustomTooltip = styled.div`
//   background-color: #fff;
//   border-radius: 4px;
//   padding: 10px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
// `;

// const TooltipText = styled.p`
//   margin: 0;
//   font-weight: bold;
//   color:#1e1e1e;
// `;

// const TooltipMain = styled.h2`
//   margin: 0;
//   font-weight: bold;
//   color:#000000;
// `;

// const CustomTooltipContent = ({ active, payload, dataKey }) => {
//     if (active && payload && payload.length) {
//         const { subject, attendancePercentage, totalClasses, attendedClasses, marksObtained, subName } = payload[0].payload;

//         return (
//             <CustomTooltip>
//                 {dataKey === "attendancePercentage" ? (
//                     <>
//                         <TooltipMain>{subject}</TooltipMain>
//                         <TooltipText>Attended: ({attendedClasses}/{totalClasses})</TooltipText>
//                         <TooltipText>{attendancePercentage}%</TooltipText>
//                     </>
//                 ) : (
//                     <>
//                         <TooltipMain>{subName.subName}</TooltipMain>
//                         <TooltipText>Marks: {marksObtained}</TooltipText>
//                     </>
//                 )}
//             </CustomTooltip>
//         );
//     }

//     return null;
// };

// // const CustomBarChart = ({ chartData, dataKey }) => {


// //     const subjects = chartData.map((data) => data.subject);
// //     const distinctColors = generateDistinctColors(subjects.length);

// //     return (
// //         <BarChart width={500} height={500} data={chartData}>
// //             <XAxis dataKey={dataKey === "marksObtained" ? "subName.subName" : "subject"} />
// //             <YAxis domain={[0, 100]} />
// //             <Tooltip content={<CustomTooltipContent dataKey={dataKey} />} />
// //             <Bar dataKey={dataKey}>
// //                 {chartData.map((entry, index) => (
// //                     <Cell key={`cell-${index}`} fill={distinctColors[index]} />
// //                 ))}
// //             </Bar>
// //         </BarChart>
// //     );
// // };

// // const CustomBarChart = ({ chartData, dataKey }) => {
// //     const subjects = chartData.map((data) => data.subject);
// //     const distinctColors = generateDistinctColors(subjects.length);

// //     return (
// //         <BarChart
// //             width={600}
// //             height={400}
// //             data={chartData}
// //             margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
// //             style={{ backgroundColor: '#1a2b55', borderRadius: 8, padding: 16 }}
// //         >
// //             <XAxis
// //                 dataKey={dataKey === "marksObtained" ? "subName.subName" : "subject"}
// //                 tick={{ fill: '#ffffff', fontWeight: 600 }}
// //                 axisLine={{ stroke: '#ffffff' }}
// //                 tickLine={{ stroke: '#ffffff' }}
// //             />
// //             <YAxis
// //                 domain={[0, 100]}
// //                 tick={{ fill: '#ffffff', fontWeight: 600 }}
// //                 axisLine={{ stroke: '#ffffff' }}
// //                 tickLine={{ stroke: '#ffffff' }}
// //             />
// //             <Tooltip
// //                 content={<CustomTooltipContent dataKey={dataKey} />}
// //                 wrapperStyle={{ backgroundColor: '#2c3e50', borderRadius: 4, color: '#fff' }}
// //                 cursor={{ fill: 'rgba(255,255,255,0.1)' }}
// //             />
// //             <Bar dataKey={dataKey} radius={[8, 8, 0, 0]}>
// //                 {chartData.map((entry, index) => (
// //                     <Cell key={`cell-${index}`} fill={distinctColors[index]} />
// //                 ))}
// //             </Bar>
// //         </BarChart>
// //     );
// // };




// const CustomBarChart = ({ chartData, dataKey }) => {
//     const subjects = chartData.map((data) => data.subject);
//     const distinctColors = generateDistinctColors(subjects.length);
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     return (
//         // <Box
//         //     sx={{
//         //         position: 'fixed',  // stays in place as you scroll
//         //         bottom: 16,         // distance from bottom
//         //         left: 16,           // distance from left
//         //         backgroundColor: '#1a2b55',
//         //         borderRadius: 2,
//         //         padding: 2,
//         //         paddingX: 20,
//         //     }}
//         // >
//         //     <BarChart
//         //         width={600}
//         //         height={400}
//         //         data={chartData}
//         //         margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
//         //     >
//         //         <XAxis
//         //             dataKey={dataKey === "marksObtained" ? "subName.subName" : "subject"}
//         //             tick={{ fill: '#ffffff', fontWeight: 600 }}
//         //             axisLine={{ stroke: '#ffffff' }}
//         //             tickLine={{ stroke: '#ffffff' }}
//         //         />
//         //         <YAxis
//         //             domain={[0, 100]}
//         //             tick={{ fill: '#ffffff', fontWeight: 600 }}
//         //             axisLine={{ stroke: '#ffffff' }}
//         //             tickLine={{ stroke: '#ffffff' }}
//         //         />
//         //         <Tooltip
//         //             content={<CustomTooltipContent dataKey={dataKey} />}
//         //             wrapperStyle={{ backgroundColor: '#2c3e50', borderRadius: 4, color: '#fff' }}
//         //             cursor={{ fill: 'rgba(255,255,255,0.1)' }}
//         //         />
//         //         <Bar dataKey={dataKey} radius={[8, 8, 0, 0]}>
//         //             {chartData.map((entry, index) => (
//         //                 <Cell key={`cell-${index}`} fill={distinctColors[index]} />
//         //             ))}
//         //         </Bar>
//         //     </BarChart>
//         // </Box>

//         <Box
//   sx={{
//     position: 'fixed',
//     bottom: 16,
//     left: sidebarOpen ? 250 : 16,  // Move right when sidebar is open
//     backgroundColor: '#1a2b55',
//     borderRadius: 2,
//     padding: 2,
//     paddingX: 20,
//     transition: 'left 0.3s ease-in-out',  // Smooth animation
//   }}
// >
//   <BarChart
//     width={600}
//     height={400}
//     data={chartData}
//     margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
//   >
//     <XAxis
//       dataKey={dataKey === "marksObtained" ? "subName.subName" : "subject"}
//       tick={{ fill: '#ffffff', fontWeight: 600 }}
//       axisLine={{ stroke: '#ffffff' }}
//       tickLine={{ stroke: '#ffffff' }}
//     />
//     <YAxis
//       domain={[0, 100]}
//       tick={{ fill: '#ffffff', fontWeight: 600 }}
//       axisLine={{ stroke: '#ffffff' }}
//       tickLine={{ stroke: '#ffffff' }}
//     />
//     <Tooltip
//       content={<CustomTooltipContent dataKey={dataKey} />}
//       wrapperStyle={{ backgroundColor: '#2c3e50', borderRadius: 4, color: '#fff' }}
//       cursor={{ fill: 'rgba(255,255,255,0.1)' }}
//     />
//     <Bar dataKey={dataKey} radius={[8, 8, 0, 0]}>
//     {(chartData || []).map((entry, index) => (
//   <Cell key={`cell-${index}`} fill={distinctColors[index]} />
// ))}

//     </Bar>
//   </BarChart>
// </Box>

//     );
// };


// // Helper function to generate distinct colors
// const generateDistinctColors = (count) => {
//     const colors = [];
//     const goldenRatioConjugate = 0.618033988749895;

//     for (let i = 0; i < count; i++) {
//         const hue = (i * goldenRatioConjugate) % 1;
//         const color = hslToRgb(hue, 0.6, 0.6);
//         colors.push(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
//     }

//     return colors;
// };

// // Helper function to convert HSL to RGB
// const hslToRgb = (h, s, l) => {
//     let r, g, b;

//     if (s === 0) {
//         r = g = b = l; // Achromatic
//     } else {
//         const hue2rgb = (p, q, t) => {
//             if (t < 0) t += 1;
//             if (t > 1) t -= 1;
//             if (t < 1 / 6) return p + (q - p) * 6 * t;
//             if (t < 1 / 2) return q;
//             if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
//             return p;
//         };

//         const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//         const p = 2 * l - q;
//         r = hue2rgb(p, q, h + 1 / 3);
//         g = hue2rgb(p, q, h);
//         b = hue2rgb(p, q, h - 1 / 3);
//     }

//     return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
// };

// export default CustomBarChart;
