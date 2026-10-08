import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { seoData } from '../data/seoData';
import PropertiesPage from './PropertiesPage';

const SeoListingPage = () => {
  const { slug } = useParams();
  
  // Intercept dynamic property search URLs (which React Router v6 partial segments don't support well)
  const propertiesMatch = slug.match(/^properties-for-sale-in-(.+)$/);
  const housesMatch = slug.match(/^houses-for-sale-in-(.+)$/);
  const plotsMatch = slug.match(/^plots-for-sale-in-(.+)$/);
  const commercialMatch = slug.match(/^commercial-property-for-sale-in-(.+)$/);
  const residentialPlotsMatch = slug.match(/^residential-plots-in-(.+)$/);
  const agricultureMatch = slug.match(/^agriculture-land-for-sale-in-(.+)$/);
  const rentalMatch = slug.match(/^rental-property-in-(.+)$/);

  if (propertiesMatch || housesMatch || plotsMatch || commercialMatch || residentialPlotsMatch || agricultureMatch || rentalMatch) {
     const city = propertiesMatch?.[1] || housesMatch?.[1] || plotsMatch?.[1] || commercialMatch?.[1] || residentialPlotsMatch?.[1] || agricultureMatch?.[1] || rentalMatch?.[1];
     let type = 'All';
     if (housesMatch) type = 'house';
     if (plotsMatch || residentialPlotsMatch) type = 'plot';
     if (commercialMatch) type = 'Commercial';
     
     return <PropertiesPage cityProp={city} typeProp={type} />;
  }

  const data = seoData[slug];

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <Helmet>
          <title>Location Not Found | Arjun Buildtech</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden text-center p-10">
          <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            📍
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Location Not Found</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We couldn't find specific details for the location or page you are searching for. However, <strong>Arjun Buildtech</strong> is a premier real estate consultant with massive opportunities available right now.
          </p>
          
          <div className="bg-red-50 border-l-4 border-red-600 p-8 rounded-r-lg mb-8 text-left max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-red-900 mb-3">Explore Prime Properties in Rohtak</h3>
            <p className="text-gray-700 mb-6 text-lg">
              Discover our exclusive, high-ROI listings in top sectors including <strong>HSVP Sectors 1, 2, 3, 25, 27</strong>, and <strong>Suncity Sectors 34, 35, 36, and 36A</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/properties"
                className="inline-block bg-red-600 hover:bg-red-700 text-white text-center font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1"
              >
                View Rohtak Properties
              </Link>
              <Link 
                to="/"
                className="inline-block bg-white text-red-600 border border-red-600 hover:bg-red-50 text-center font-semibold py-3 px-8 rounded-lg transition duration-300"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="keywords" content={`${slug.replace(/-/g, ' ')}, rohtak real estate, property in rohtak`} />
        <link rel="canonical" href={`https://arjunbuildtech.com/${slug}`} />
      </Helmet>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="h-64 sm:h-80 md:h-96 w-full relative">
          <img 
            src={data.imageUrl} 
            alt={data.h1} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center px-4 drop-shadow-lg">
              {data.h1}
            </h1>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <article className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-6">
              {data.content}
            </p>
            
            <h2 className="text-2xl font-semibold text-red-900 mb-4">Key Benefits & Features</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              {data.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-600">{benefit}</li>
              ))}
            </ul>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg mb-8">
              <h3 className="text-xl font-bold text-red-900 mb-2">Interested in this property?</h3>
              <p className="text-gray-700 mb-4">
                Don't miss out on this incredible real estate opportunity. Click below to view the complete property details, pricing, and contact our expert agents at Arjun Buildtech.
              </p>
              <Link 
                to={data.propertyLink}
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1"
              >
                View Full Property Details
              </Link>
            </div>
            
            <div className="text-sm text-gray-500 mt-8 border-t pt-4">
              <p>Looking for more options? Browse our <Link to="/properties" className="text-red-600 hover:underline">complete property listings in Rohtak</Link>.</p>
            </div>

            {/* Arjun Buildtech Contact & Trust Section */}
            <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About Arjun Buildtech</h3>
              <p className="text-gray-700 mb-4">
                Arjun Buildtech is a premier real estate and property consulting firm based in Rohtak, Haryana. We specialize in selling and investment consulting for residential and commercial properties. While we cater to property buyers all over India, our core expertise lies in prime zones in Rohtak, specifically <strong>HSVP Sectors 1, 2, 3, 25, 27</strong> and <strong>Suncity Sectors 34, 35, 36, and 36A</strong>.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Office Locations</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start"><span className="mr-2">📍</span> G74P, Sector-27, Rohtak, Haryana</li>
                    <li className="flex items-start"><span className="mr-2">📍</span> 828, Sector-1, Rohtak, 124001, Haryana</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Us</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start"><span className="mr-2">📞</span> <div><strong>Parveen Gehlawat:</strong> <a href="tel:+919350447531" className="text-red-600 hover:underline">93504-47531</a>, <a href="tel:+919899481428" className="text-red-600 hover:underline">98994-81428</a></div></li>
                    <li className="flex items-start"><span className="mr-2">📞</span> <div><strong>Naveen Gehlawat:</strong> <a href="tel:+919812150126" className="text-red-600 hover:underline">98121-50126</a></div></li>
                    <li className="flex items-start"><span className="mr-2">✉️</span> <a href="mailto:arjunbuildtech27@gmail.com" className="text-red-600 hover:underline">arjunbuildtech27@gmail.com</a></li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
                <a href="https://www.justdial.com/Rohtak/Arjun-Buildtech-Near-Sun-City-Sector-27/9999PX126-X126-220412152824-M3Q2_BZDET" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-gray-700 hover:text-red-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 transition-colors">
                  <span className="mr-2 text-yellow-500">⭐ 4.9/5 on Justdial</span>
                  View Reviews
                </a>
                <a href="https://www.facebook.com/arjunbuildtech/" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-gray-700 hover:text-red-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 transition-colors">
                  <span className="mr-2 text-red-600 text-lg">📘</span>
                  Follow on Facebook
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default SeoListingPage;
