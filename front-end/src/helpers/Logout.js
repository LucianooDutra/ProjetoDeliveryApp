function Logout(historyProps) {
  const history = historyProps;
  localStorage.clear();
  return history.push('/login');
}

export default Logout;
