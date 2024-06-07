import useAxiosCommon from '@/Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Shared/Loader/Loader';
import Container from '@/components/Container/Container';
import Heading from '../Shared/Heading';
import CampReservation from './CampReservation';

const CampDetails = () => {
  const { id } = useParams()
  const axiosCommon = useAxiosCommon()

  const { data: camp = {}, isLoading, isPending, isFetching } = useQuery({
    queryKey: ['camp', id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/camp/${id}`)
      return data
    },
  });

  const imageUrl = Array.isArray(camp?.images)
    ? camp?.images[0].secure_url
    : camp?.images;


  if(isLoading || isPending || isFetching) return <Loader/>

  console.log(camp)
  return (
    <Container>
      <div className="my-3">
        {camp && (
          <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
              <div>
                <Heading title={camp?.name} subtitle={camp?.location} />
              </div>
              <div className="w-full md:h-[60vh] overflow-hidden rounded-xl">
                <img
                  className="object-cover w-full rounded-xl"
                  src={imageUrl}
                  alt={camp?.name}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
              <div className="col-span-4 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <div
                    className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              "
                  >
                    <div>Organize by {camp?.organizer?.name}</div>

                    <img
                      className="rounded-full object-cover"
                      height="30"
                      width="30"
                      alt="Avatar"
                      src={
                        camp?.organizer?.image
                          ? camp?.organizer?.image
                          : "https://i.ibb.co/SBp9mYf/not-found.jpg"
                      }
                    />
                  </div>
                  <div
                    className="
                flex 
                flex-row 
                items-center 
                gap-4 
                font-light
                text-neutral-500
              "
                  >
                    <div>{camp?.rating} rating</div>
                    <div>{camp?.participantCount} participant</div>
                  </div>
                </div>

                <hr />
                <div
                  className="
          text-lg font-light text-neutral-500"
                >
                  {camp?.description}
                </div>
                <hr />
              </div>

              <div className="md:col-span-3 order-first md:order-last mb-10">

                <CampReservation camp={camp} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CampDetails;