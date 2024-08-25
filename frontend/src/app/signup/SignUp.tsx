'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/utils/supabase/client';
import OAuthButton from '@/components/OAuthButton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const schema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
});

type FormFields = z.infer<typeof schema>;

const SignUp = () => {
  const form = useForm<FormFields>({ resolver: zodResolver(schema) });

  const [isLinkSent, setIsLinkSent] = useState(false);

  const handleSignUp: SubmitHandler<FormFields> = async (data) => {
    const { email, password } = data;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      form.setError('root', {
        message: 'Error submitting form',
      });
    } else {
      setIsLinkSent(true);
    }
  };

  const handleOAuthSignin = async (
    provider: 'google' | 'facebook' | 'github'
  ) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    if (error) {
      form.setError('root', {
        message: 'Could not authenticate user!',
      });
    }
  };

  return (
    <Card className="max-w-md w-[90%] mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="text"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full mt-4"
          >
            {form.formState.isSubmitting ? 'Loading...' : 'Sign Up'}
          </Button>
          <OAuthButton
            provider="google"
            buttonText="Sign Up with Google"
            onClick={() => handleOAuthSignin('google')}
          />

          {form.formState.errors.root && (
            <FormMessage className="mt-2">
              {form.formState.errors.root.message}
            </FormMessage>
          )}
        </form>
      </Form>

      {isLinkSent && (
        <div className="mt-4 text-success text-sm">
          An activation link has been sent to your email. Please check your
          inbox to verify your account.
        </div>
      )}
    </Card>
  );
};

export default SignUp;
