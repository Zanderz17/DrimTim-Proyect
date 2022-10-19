import Sidebar from '../sidebar/Sidebar';
import Title from '../title/Title';

function TestSidebar() {
  return (
    <div className='d-flex'>
      <Sidebar />
      <Title 
        document="Solicitud de compra" 
        type="Compras nacionales" 
        subType="Nuevo documento"
        active1={true}
        active2={false}
        active3={false}
      >
      </Title>
    </div>
  );
}

export default TestSidebar;
