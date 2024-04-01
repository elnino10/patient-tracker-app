// import React from 'react';

// const AboutPage = () => {
//   return (
//     <div className="bg-gray-100 py-20">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold mb-8 md:text-center">About PatientTracker</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Column 1 */}
//           <div className="px-card bg-white rounded-lg shadow-md p-6">
//             <h3 className="text-xl font-bold mb-4">Monitor Patients</h3>
//             <ul>
//               <li>Records Patient Information</li>
//               <li>Records Patient Consultations</li>
//               <li>Schedules Appointments</li>
//             </ul>
//             </div>
//             <div className="px-card bg-white rounded-lg shadow-md p-6">
//             <h3 className="text-xl font-bold mb-4">Monitor Patients</h3>
//             <ul>
//               <li>Records Patient Information</li>
//               <li>Records Patient Consultations</li>
//               <li>Schedules Appointments</li>
//             </ul>
//             </div>
//           {/* Column 2 */}
//           <div className="px-card bg-white rounded-lg shadow-md p-6">
//             <h3 className="text-xl font-bold mb-4">Convenient to Use</h3>
//             <ul>
//               <li>Accessible Anytime and Anywhere</li>
//               <li>Printable Records</li>
//               <li>User-Friendly Interface</li>
//             </ul>
//           </div>
//         </div>
//         <div className="h-20"></div>
//         <h2 className="text-2xl font-bold mb-4">Medical Records</h2>
//         <p>PxTrack is an accessible, flexible, and secure application that helps medical doctors store and access patient records in one place. With internet connectivity, this EMR system allows you to access your records during your rounds or when you work from clinic to clinic.</p>
//         <div className="h-8"></div>
//         <div className="flex justify-center">
//           <a href="https://www.pxtrack.tech/book-now/" className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700">Book For Free Demo</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutPage;

import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 pt-10 h-screen">
      <div className="container mx-auto px-4">
        {/* Medical Records Section */}
        <div className="mb-8 md:flex md:text-center">
          <div className=''>
            <h2 className="text-base text-center font-bold mb-4">About PatientTracker</h2>
            <div><p className='text-center text-4xl pb-8 font-bold text-[#428df5]'>FEATURES AND BENEFITS</p></div>
            <p className='text-center'>PatientTracker is an accessible, flexible, and
              secure application that helps medical doctors
              store and access patient records in one place.
              With internet connectivity, this EMR system
              allows you to access your records during your
              rounds or when you work from clinic to clinic.</p>
          </div>
          {/* <div className="md:w-1/2">
            <Link to="/" className="w-full flex text-base md:hover:text-blue-200 cursor-pointer">See Features
            </Link>
          </div> */}
        </div>
        
        {/* Feature Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 md:text-sm">
            <h3 className="text-xl font-bold mb-4">Monitor Patients</h3>
            <ul>
              <li>Records Patient Information</li>
              <li>Records Patient Consultations</li>
              <li>Schedules Appointments</li>
            </ul>
          </div>
          {/* Column 2 */}
            <div>
            <div className="bg-white rounded-lg shadow-md p-6 md:text-sm">
            <h3 className="text-xl font-bold mb-4">Monitor Patients</h3>
            <ul>
              <li>Records Patient Information</li>
              <li>Records Patient Consultations</li>
              <li>Schedules Appointments</li>
            </ul>
          </div>
          </div>
          {/* Column 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 md:text-sm">
            <h3 className="text-xl font-bold mb-4">Convenient to Use</h3>
            <ul>
              <li>Accessible Anytime and Anywhere</li>
              <li>User-Friendly Interface</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

