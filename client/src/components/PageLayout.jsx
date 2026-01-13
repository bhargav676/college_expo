

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
  
      <main className="pt-6">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
