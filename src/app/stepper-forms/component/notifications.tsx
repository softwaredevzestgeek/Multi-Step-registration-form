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
import { Switch } from "@/components/ui/switch"


export default function StepThirdForm({ form }: { form: any }) {
    return (
          <>
            <div>
            <h3 className="mb-4 text-lg font-medium text-slate-100 ">Notifications</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email_notification"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-slate-100 text-slate-100 ">Email Notifications</FormLabel>
                      <FormDescription>
                        Receive emails about new products, features, and more.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                      className="data-[state=checked]:bg-orange-500"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sms_emails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-slate-100">SMS emails</FormLabel>
                      <FormDescription>
                        Receive sms about your account.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                      className="data-[state=checked]:bg-orange-500"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-2.5" >
            <h3 className="mb-4 text-lg font-medium text-slate-100">Privacy settings</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="profileVisibility"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-slate-100" >Profile visibility</FormLabel>
                      <FormDescription>
                      Allow users to manage visibility.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                      className="data-[state=checked]:bg-orange-500"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact_information"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-slate-100" >Contact Information</FormLabel>
                      <FormDescription>
                      Enable users to choose who can see their contact information.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                      className="data-[state=checked]:bg-orange-500"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          </>
    );
  }