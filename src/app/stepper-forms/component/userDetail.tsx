'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";


export default function StepOneForm({form}: { form:any}) {
    const [password, setPassword] = useState<string>('');
    const [passwordValid, setPasswordValid] = useState<boolean>(false);
    const [passwordCriteria, setPasswordCriteria] = useState<any>({
      isValidLength: false,
      hasNumber: false,
      hasLowercase: false,
      hasUppercase: false,
      hasSpecialChar: false,
    });
    const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  
    const handlePasswordFocus = () => {
      setPasswordFocused(true);
    };
  
    const handlePasswordBlur = () => {
      setPasswordFocused(false);
    };
  
    const checkPassword = (password: string) => {
      const isValidLength = password.length >= 8;
      const hasNumber = /\d/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
      const validPassword = isValidLength && hasNumber && hasLowercase && hasUppercase && hasSpecialChar;
      setPasswordValid(validPassword);
    if(validPassword){
      setPasswordFocused(false);
    }
  
  
  
      setPasswordCriteria({
        isValidLength,
        hasNumber,
        hasLowercase,
        hasUppercase,
        hasSpecialChar
      });
  
      return {
        isValidLength,
        hasNumber,
        hasLowercase,
        hasUppercase,
        hasSpecialChar
      };
    };
  
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>, field:any) => {
      const newPassword = event.target.value;
      field?.onChange(event)
      setPassword(newPassword);
      checkPassword(newPassword);
    };
    
  
  
    const renderPasswordChecklist = () => {
  
      
      if (!passwordFocused) {
        return null; 
      }
    
      return (
        <div className="password-checklist text-white">
          <h3 className="checklist-title text-sm">Password should be : </h3>
          <ul className="checklist ">
            <li id="length" className={`list-item ${passwordCriteria.isValidLength ? 'valid' : 'invalid'} text-xs `}>At least 8 characters long</li>
            <li id="number" className={`list-item ${passwordCriteria.hasNumber ? 'valid' : 'invalid'} text-xs`}>At least 1 number</li>
            <li id="lowercase" className={`list-item ${passwordCriteria.hasLowercase ? 'valid' : 'invalid'} text-xs`}>At least 1 lowercase letter</li>
            <li id="uppercase" className={`list-item ${passwordCriteria.hasUppercase ? 'valid' : 'invalid'} text-xs`}>At least 1 uppercase letter</li>
            <li id="special" className={`list-item ${passwordCriteria.hasSpecialChar ? 'valid' : 'invalid'} text-xs`}>At least 1 special character</li>
          </ul>
        </div>
      );
    }
  
  
    return (
        <>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel className="text-slate-100">Name</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem className="mb-2">
                        <FormLabel className="text-slate-100" >Email</FormLabel>
                        <FormControl>
                            <Input className="bg-white" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem className="mb-2">
                        <FormLabel className="text-slate-100" >Password</FormLabel>
                        <FormControl>
                            <Input type="password" className="bg-white" placeholder="Enter your password" {...field} 
                            value={password}
                  onChange={(event) => handlePasswordChange(event, field)} onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur} 
                  />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
          {renderPasswordChecklist()}
            </>
    );
  }