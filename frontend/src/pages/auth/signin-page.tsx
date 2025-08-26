"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Music, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { SocialLogin } from "./social-login";
import { CustomCheckbox } from "@app/shared/components";

export function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { t } = useTranslation();

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.emailRequired")),
    password: Yup.string()
      .min(6, t("validation.passwordMinLength"))
      .required(t("validation.passwordRequired")),
    rememberMe: Yup.boolean().notRequired(),
  });

  const handleSubmit = async (
    values: { email: string; password: string; rememberMe?: boolean },
    { setSubmitting }: any
  ) => {
    try {
      // Здесь будет логика авторизации
      console.log("Sign in:", values);
      // await signIn(values);
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 relative">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
          <Music className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {t("auth.welcome")}
        </h1>
        <p className="text-gray-300">{t("auth.welcomeSubtitle")}</p>
      </div>

      {/* Form */}
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-6">
            {/* Email Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Field
                  name="email"
                  type="email"
                  placeholder={t("auth.email")}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="mt-1 text-red-400 text-sm"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("auth.password")}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="mt-1 text-red-400 text-sm"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <CustomCheckbox
                  checked={values.rememberMe}
                  onCheckedChange={(checked: boolean) =>
                    setFieldValue("rememberMe", checked)
                  }
                >
                  <span className="text-sm text-gray-300">
                    {t("auth.rememberMe")}
                  </span>
                </CustomCheckbox>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                {t("auth.forgotPasswordLink")}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t("auth.signingIn") : t("auth.signIn")}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">
                  {t("auth.or")}
                </span>
              </div>
            </div>

            <SocialLogin />

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-gray-300">{t("auth.noAccount")} </span>
              <Link
                href="/auth/signup"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                {t("auth.signUp")}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
