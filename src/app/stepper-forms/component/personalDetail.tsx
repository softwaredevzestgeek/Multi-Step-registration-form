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
import { Textarea } from "@/components/ui/textarea"

export default function StepSecondForm({ form }: { form: any }) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImagePreview(reader.result as string);
          form.setValue("profile_picture", reader.result as string);
        };
      }
    };
  
    return (
          <>
            <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                    <FormItem className="mb-2">
                        <FormLabel className="text-slate-100">Bio</FormLabel>
                        <FormControl>
                            <Textarea className="bg-white" placeholder="Type your Bio here... " {...field}/>
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="profile_picture"
                render={({ field }) => (
                    <FormItem className="mb-2">
                        <FormLabel className="text-slate-100">Profile picture</FormLabel>
                        <FormControl>
                            <Input className="bg-white" type="file" onChange={handleImageChange} />
                        </FormControl>
                        {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg" style={{ maxWidth: '100%', maxHeight: '200px' }} />
              )}
                    </FormItem>
                )}
            />
          </>
    );
  }
  