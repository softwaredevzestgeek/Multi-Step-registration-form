'use client'

import { Step, type StepItem, Stepper, useStepper} from "@/components/stepper";
import { Button } from "@/components/ui/button";
import {Form} from "@/components/ui/form"
import {useForm } from "react-hook-form";
import {useState } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import StepOneForm from "@/app/stepper-forms/component/userDetail"
import StepSecondForm from"@/app/stepper-forms/component/personalDetail"
import StepThirdForm from"@/app/stepper-forms/component/notifications"

const steps = [
	{ label: "Step 1" },
	{ label: "Step 2" },
	{ label: "Step 3" },
] satisfies StepItem[];

const FormSchema = z.object({
  name: z.string().nonempty({
    message: "Name is required*",
  }),
  email: z.string().nonempty({
    message: "Email is required*",
  }).email({
    message: "Invalid email address*",
  }),

  password: z.string().min(8, {
    message: "password required*",
  }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.",
  }),
  email_notification: z.boolean(),
  profileVisibility: z.boolean(),
  currentStep: z.number()
});

export default function StepperForm() {
 
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email:"",
      password:"",
      email_notification: true,
      profileVisibility:true,
      currentStep: 0
    },
  })
  const { toast } = useToast()

  const submitFormDataToAPI = async (formData:any) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log("Form data submitted successfully")
       
        return true;
      } else {
        console.log("Failed to submit form data")
        
        return false;
      }
    } catch (error) {
      console.log("Error submitting form data")
      
      return false;
    }
  };
  
  
  const onSubmit = async (data: z.infer<typeof FormSchema>, index: number) => {
    switch (index) {
      case 0:
        if (!data.name || !data.email || !data.password) {
          console.error("Name, email, and password are required.");
          return;
        }
       
        console.log("Step 1 form submitted successfully:", data);
        break;
      case 1:
        console.log("Step 2 form submitted successfully:", data);
        break;
      case 2:
        console.log("Step 3 form submitted successfully:", data);
        const success = await submitFormDataToAPI(data);
        if (success) {
          toast({
            className: 'bg-lime-700',
            description: "Form data submitted successfully",
          })
         
        } else {
          console.error('Failed to submit form data to API.');
        
        }
        break;
      default:
       
    }
   

  }

  
  


  
	return (
		<div className="flex w-full flex-col gap-4 rounded-lg p-5  mb-20 ">
			<Stepper initialStep={0} steps={steps}>
				{steps.map((stepProps, index) => {
					return (
						<Step key={stepProps.label} {...stepProps}>
              <Form {...form} >
              <form onSubmit={form.handleSubmit( (data: z.infer<typeof FormSchema>) => onSubmit(data, index))} className="w-full ">
							<div className="h-100 flex items-center justify-center my-2 border-2 border-gray-200 bg-transparent text-primary rounded-md">
                <div className="w-full p-5" >
                {index === 0 && <StepOneForm form={form}  />}
                {index === 1 && <StepSecondForm form={form} />}
                {index === 2&& <StepThirdForm form={form}/>}
                </div>
							</div> 
              </form>
              </Form>
						</Step>
					);
				})}
	 <Footer onSubmit={onSubmit}  form={form} />
			</Stepper>
		</div>
	);
}



const Footer = ({ onSubmit ,form }:any) => {
	const {
    nextStep,
		prevStep,
		resetSteps,
		hasCompletedAllSteps,
		isLastStep,
		isOptionalStep,
		isDisabledStep,
	} = useStepper();

const formValues =  form.getValues()
const [isLoading, setIsLoading] = useState(false);
const [showFullBio, setShowFullBio] = useState(false);


  const toggleShowFullBio = () => {
    setShowFullBio(!showFullBio);
  };

  const handleButtonClick=()=>{
    setIsLoading(true);
    setTimeout(()=>{
      form.trigger().then((isValid: boolean) => {
        if (isValid) {
          form.setValue('currentStep', form.getValues('currentStep') + 1)
          setIsLoading(false);
          onSubmit(form.getValues(), form.getValues('currentStep'));
          nextStep();
        } else {
          setIsLoading(false);
        }
    })
    },2000)


  }

	return (
		<>
			{hasCompletedAllSteps && (
        <Card>
  <CardHeader>
    <CardTitle className="text-center text-green-600 text-2xl">Thank you filling out the form 🎉</CardTitle>
    <CardDescription className="text-center m-0">your submission has been sent!</CardDescription>
  </CardHeader>
  <CardContent>
   <div>
    <div className="flex justify-center mt-4 mb-5">
        <div className="w-36 h-36" >
          <img className="w-full h-full rounded-full" src={formValues?.profile_picture || '/image/no_profile.webp' } />
        </div>
        </div>
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <p className="font-semibold">Name:</p>
                  <p>{formValues.name || 'NA'}</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Email:</p>
                  <p className="break-all">{formValues.email || 'NA'}</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Password:</p>
                  <p>{formValues.password || 'NA'}</p>
                </div>
                <div className="flex flex-col">
      <p className="font-semibold">Bio:</p>
      <div className={`overflow-hidden ${showFullBio ? '' : 'max-h-12'}`}>
        <p>{showFullBio ? formValues.bio || 'NA' : (formValues.bio || 'NA').slice(0, 100)}</p>
      </div>
      {formValues.bio && formValues.bio.length > 100 && (
        <button className=" text-xs text-orange-500 hover:underline cursor-pointer" onClick={toggleShowFullBio}>
          {showFullBio ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Email Notification:</p>
                  <p>{formValues.email_notification ? "Enabled" : "Disabled"}</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Profile Visibility:</p>
                  <p>{formValues.profileVisibility ? "Public" : "Private"}</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">SMS Emails:</p>
                  <p>{formValues.sms_emails ? "Enabled" : "Disabled"}</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Contact Information:</p>
                  <p>{formValues.contact_information ? "Enabled" : "Disabled"}</p>
                </div>
            </div>
          </div>
        </CardContent>
  
      </Card>
			)}
			<div className="w-full flex justify-end gap-2">
				{hasCompletedAllSteps ? (''
					
				) : (
					<>
						<Button
							disabled={isDisabledStep}
							onClick={prevStep}
							size="sm"
							variant="secondary"
						>
							Prev
						</Button>
						<Button className="bg-orange-500" size="sm"   onClick={handleButtonClick}>
              {isLoading ? (<svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014 12H0c0 6.627 5.373 12 12 12v-4c-2.589 0-4.98-.978-6.803-2.709l-1.254 1.254z"
                    ></path>
                  </svg>) : (isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next")}
						</Button>
					</>
				)}
			</div>
		</>
	);
};