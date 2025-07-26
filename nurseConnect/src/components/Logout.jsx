import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

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
