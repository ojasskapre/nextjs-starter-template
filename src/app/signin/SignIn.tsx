'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/utils/supabase/client';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const handleSignIn: SubmitHandler<FormFields> = async (data) => {
    console.log(data);

    // const { error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });
    // if (error)
    //   setError('root', {
    //     message: 'Error submitting form',
    //   });
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-card rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-foreground">Sign In</h2>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <input
          className="border border-border bg-input text-foreground p-3 mb-2 w-full rounded focus:outline-none focus:ring focus:ring-ring"
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
          {isSubmitting ? 'Loading...' : 'Sign In'}
        </button>
        {errors.root && (
          <div className="text-error mt-2 text-sm">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
};

export default SignIn;
