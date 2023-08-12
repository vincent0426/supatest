import ClientOnly from '../ClientOnly';
import { DataTable } from '../DataTable';
import { GenerateForm } from '../GenerateForm';

const GenerateCard = () => {
  return (
    <>
      <ClientOnly>
        <GenerateForm />
      </ClientOnly>
      <DataTable />
    </>
  );
};

export default GenerateCard;