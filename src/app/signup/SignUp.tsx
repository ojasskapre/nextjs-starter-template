'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/utils/supabase/client';
import OAuthButton from '@/app/components/OAuthButton';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

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
      setError('root', {
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
      setError('root', {
        message: 'Could not authenticate user!',
      });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-card rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-foreground">Sign Up</h2>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <input
          className="border border-border bg-input text-foreground p-3 mb-2 w-full rounded focus:outline-none focus:ring focus:ring-ring"
          type="text"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && (
          <div className="text-error text-sm">{errors.email.message}</div>
        )}

        <input
          className="border border-border bg-input text-foreground p-3 mb-2 mt-4 w-full rounded focus:outline-none focus:ring focus:ring-ring"
          type="password"
          placeholder="Password"
          {...register('password')}
        />
        {errors.password && (
          <div className="text-error text-sm">{errors.password.message}</div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-accent-foreground py-3 rounded hover:bg-accent-hover transition duration-200 mt-4"
        >
          {isSubmitting ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuthButton
          provider="google"
          buttonText="Sign Up with Google"
          onClick={() => handleOAuthSignin('google')}
        />

        {errors.root && (
          <div className="text-error mt-2 text-sm">{errors.root.message}</div>
        )}
      </form>

      {isLinkSent && (
        <div className="mt-4 text-success text-sm">
          An activation link has been sent to your email. Please check your
          inbox to verify your account.
        </div>
      )}
    </div>
  );
};

export default SignUp;
