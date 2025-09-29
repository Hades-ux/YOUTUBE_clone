import axios from "axios";
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Watch = () => {

  const BACKEND_URL = import.meta.env.VITE_API_URL;

    const { id } = useParams();
    const [ video, setVideo ] = useState(null)
    const [ related, setRelated] = useState([])
    const [ loading, setLoading ] = useState(true)
    const navigate = useNavigate();
    const [isMore, setMore] = useState(true)

    
  const toggleDescription = () => setMore(!isMore);

    useEffect(() => {

        const fetchVideo = async() => {
        
           try {
             const res = await axios.get(`${BACKEND_URL}/api/v1/video/${ id }`);
             setVideo(res.data.video);

             const rel = await axios.get(`${BACKEND_URL}/api/v1/video/random`);
             const filteredRelated = rel.data.videos.filter(v => v._id !== id);
             setRelated(filteredRelated) 
           } catch (error) {
            console.log("error: ", error.message);
           } finally {
            setLoading(false);
           }

        };

            fetchVideo();
    }, [ id ])

    if (loading){
        return <p>Loading video....</p>
    }
    if (!video){
        return <p>Video not found</p>
    }
    

  return (
    <div className='box-border flex'>

        {/* right container */}
        <div className=" overflow-y-auto px-4">
         
          

            {/* video container */}
            <video 
            controls
            tabIndex={-1}
            autoPlay={false}
            controlsList="nodownload"
            style={{ width: '1050px', height: '630px' }}
            src={video.video?.url || ''}>
            Your browser does not support the video tag.
            </video>
             
            <div>
              <h1 className="text-2xl" >{video.title}</h1>

              <div className="flex items-center gap-2">
              <img 
              src={video.owner?.avatar?.url || ''} 
              alt={video.owner?.userName || 'owner'} 
              className=" mt-2 rounded-full w-12 h-12"/>
              <div>
              <h2 className="text-sm">{video.owner?.userName || ''}</h2>
              
              <h3 className="text-text-gray-500">{video.owner.subscriberCount || 0} Subscribers</h3>
              </div>

              <button className=" bg-gray-200 px-2.5 py-1 rounded-2xl">
                Join
              </button>

              <button className=" bg-black text-white px-2.5 py-1 rounded-2xl">
                subscribe
              </button>

              </div>

              <div className={`w-full ${isMore ? "h-40" : "max-h-fit"} bg-gray-400 rounded-xl p-4 mt-4 mb-6 transition-all`}>
                <p>{video.views} Views <span>{dayjs(video.createdAt).fromNow()}</span></p>
                <h1  className="text-sm text-gray-600" >{video.title}</h1>
                <p>{video.description || "Description needed"} 

                  <button
                   onClick={toggleDescription}
                   className="ml-3 mt-3 inline-block bg-black text-white text-sm px-4 py-1 rounded-full cursor-pointer">

                    {isMore? "More" : "Less" }

                  </button>
                  </p>
                </div>
              </div>


        </div>

        {/* left container */}
        <div className=" w-96 flex flex-col gap-2 pr-4 mt-8 overflow-y-hidden">
           {related.map((video) => (
            <div 
            key={video._id} 
            className="flex gap-3 h-32 cursor-pointer"
            onClick={() => {navigate(`/watch/${video._id}`)}}>
            <img
              src={video.thumbnail?.url}
              alt={video.title || 'Related Video'}
              className="w-44 h-32 rounded-lg"
            />
            <div>

            <h1 className="font-semibold text-gray-800 line-clamp-2" >{video.title}</h1>

            <h2 className="text-gray-500 truncate text-sm">{video.owner.userName}</h2>
            
            {/* discriptiom */}
            <p className="text-gray-500 text-sm">{video.views || 0 } Views • <span>{dayjs(video.createdAt).fromNow()}</span></p>
            </div>
            </div>

           ))}
        </div>

    </div>
  )
}

export default Watch