
import StepperForm from '@/app/stepper-forms/page'
export default function Home() {
  return (
    <main className=" form-wrapper flex  flex-col items-center justify-between  h-screen overflow-auto ">
        
        <div className=" flex w-full  md:w-2/5 lg:w-2/5 xl:w-2/5  mt-20 ">
				
				<StepperForm />
			</div>
        
    </main>
  );
}
