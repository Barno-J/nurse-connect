import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

const Logout = () => {
  const navigate = useNavigate();
 const { logout } = useUser();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 button-secondary hover:bg-secondary-hover rounded"
    >
      Logout
    </button>
  );
};

export default Logout;
