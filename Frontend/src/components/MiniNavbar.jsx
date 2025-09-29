import { useNavigate } from 'react-router-dom';

const MiniNavbar = ({items = []}) => {
  const navigate = useNavigate();

  return (
    <nav className="flex text-3xl gap-8 p-4 border-b border-gray-300">
      {items.map((item) => (
        <span
          key={item.path}
          className="text-gray-500 cursor-pointer hover:text-black hover:underline"
          onClick={() => navigate(item.path)}
        >
          {item.name}
        </span>
      ))}
    </nav>
  );
};

export default MiniNavbar;
