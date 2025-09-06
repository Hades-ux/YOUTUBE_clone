import axios from "axios";
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Watch = () => {

    const { id } = useParams();
    const [ video, setVideo ] = useState(null)
    const [ related, setRelated] = useState([])
    const [ loading, setLoading ] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {

        const fetchVideo = async() => {
        
           try {
             const res = await axios.get(`/api/v1/video/${ id }`);
             setVideo(res.data.video);

             const rel = await axios.get("/api/v1/video/random");
             const filteredRelated = rel.data.videos.filter(v => v._id !== id);
             setRelated(filteredRelated) 
             console.log("Api response rel.data.videos",rel.data.videos)
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
    <div className='w-screen f-ull flex'>

        {/* right container */}
        <div className="mt-5 overflow-y-auto">
         
          

            {/* video container */}
            <video 
            controls
            tabIndex={-1}
            autoPlay
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
              <h2 className="text-xl">{video.owner?.userName || ''}</h2>
              <h3>{video.owner.subscriberCount || 0} Subscribers</h3>
              </div>

              <button className=" bg-gray-200 px-2.5 py-1 rounded-2xl">
                Join
              </button>
              <button className=" bg-black text-white px-2.5 py-1 rounded-2xl">
                subscribe
              </button>

              </div>
            </div>


        </div>

        {/* left container */}
        <div className=" w-96 h-[45rem] flex flex-col gap-2 p-2 mt-5 overflow-y-auto">
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
            <p className="text-gray-500 text-sm">{video.views || 0 } Views • <span>{dayjs(video.createdAt).fromNow()}</span></p>
            </div>
            </div>

           ))}
        </div>

    </div>
  )
}

export default Watch