import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    //TODO: Get user from the backend    
    
    return (
        <div style={{
            
        }}>
            <div style={{
                
            }}>
            <Header/>
              {children}
            <Footer />
            </div>
        </div>
    );
};

export default MainLayout;