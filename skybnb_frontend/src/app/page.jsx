'use client'
import ListingCard from '@/components/listingCard';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/api/api'
import { useAuth } from '@/components/auth/AuthProvider';
import Cookies from 'js-cookie';

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const { logout, isAuthenticated } = useAuth()
  const Router = useRouter()
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true)
        const response = await api.getHotels();
        if (response?.data?.hotels) {
          setListings(response?.data?.hotels);
        }
        setIsLoading(false)
      } catch (error) {
        logout()
        setIsLoading(false)
        Router.push('/login')
      }
    };
    fetchListings();
  }, []);

  const handleListingClick = (listingUUID) => {
    Router.push(`/hotel/${listingUUID}`);
  };

  return (
    <div className="ml-16 my-12 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
      {!isLoading ? (
        listings.length ? (
          listings.map((listing) => (
            <div key={listing.id} onClick={() => handleListingClick(listing.UUID)}>
              <ListingCard {...listing} />
            </div>
          ))
        ) : (
          <p>No List To show...</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ListingsPage;
