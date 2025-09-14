import { useNavigate } from 'react-router-dom';

const VideoNavbar = () => {
  const navigate = useNavigate();

  const list = [
    { name: 'Inspiration', path: '/inspiration' },
    { name: 'Videos', path: '/videos' },
    { name: 'Shorts', path: '/shorts' },
    { name: 'Live', path: '/live' },
    { name: 'Posts', path: '/posts' },
    { name: 'Playlists', path: '/playlists' },
    { name: 'Podcast', path: '/podcast' },
  ];

  return (
    <nav className="flex text-3xl gap-8 p-4 border-b border-gray-300">
      {list.map((item, index) => (
        <span
          key={index}
          className="text-gray-500 cursor-pointer hover:text-black hover:underline"
          onClick={() => navigate(item.path)}
        >
          {item.name}
        </span>
      ))}
    </nav>
  );
};

export default VideoNavbar;
