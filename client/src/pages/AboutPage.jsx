import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: 'url("https://www.pxtrack.tech/wp-content/uploads/2021/12/artboard.webp")' }}>
      <div className="container mx-auto py-20 flex">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="col-span-1 md:col-span-3">
            <h2 className="text-3xl font-bold mb-4">Secure</h2>
            <p>Store sensitive and confidential patient records in a secure cloud-based electronic medical records system that is compliant with data privacy standards for encryption, data integrity, and availability.</p>
          </div>
          {/* Feature 2 */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-3xl font-bold mb-4">Feature 2</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          {/* Feature 3 */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-3xl font-bold mb-4">Feature 3</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
