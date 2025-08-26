"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Eye,
  EyeOff,
  Music,
  Mail,
  Lock,
  User,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { CustomCheckbox } from "../../shared/components/custom-checkbox";
import { SocialLogin } from "./social-login";

export function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation();

  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t("validation.nameMinLength"))
      .required(t("validation.nameRequired")),
    email: Yup.string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.emailRequired")),
    password: Yup.string()
      .min(8, t("validation.passwordMinLength8"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        t("validation.passwordPattern")
      )
      .required(t("validation.passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("validation.passwordsMustMatch"))
      .required(t("validation.confirmPasswordRequired")),
    agreeToTerms: Yup.boolean().oneOf(
      [true],
      t("validation.agreeToTermsRequired")
    ),
  });

  const handleSubmit = async (
    values: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      agreeToTerms: boolean;
    },
    { setSubmitting }: any
  ) => {
    try {
      console.log("Sign up:", values);
    } catch (error) {
      console.error("Sign up error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center animate-pulse w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
          <Music className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {t("auth.createAccount")}
        </h1>
        <p className="text-gray-300">{t("auth.createAccountSubtitle")}</p>
      </div>

      {/* Form */}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, errors, touched, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Field
                  name="name"
                  type="text"
                  placeholder={t("auth.fullName")}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <ErrorMessage
                name="name"
                component="div"
                className="mt-1 text-red-400 text-sm"
              />
            </div>

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

              <div className="mt-2 space-y-1">
                <div
                  className={`flex items-center text-xs ${values.password.length >= 8 ? "text-green-400" : "text-gray-400"}`}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {t("passwordRequirements.minLength")}
                </div>
                <div
                  className={`flex items-center text-xs ${/[a-z]/.test(values.password) ? "text-green-400" : "text-gray-400"}`}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {t("passwordRequirements.lowercase")}
                </div>
                <div
                  className={`flex items-center text-xs ${/[A-Z]/.test(values.password) ? "text-green-400" : "text-gray-400"}`}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {t("passwordRequirements.uppercase")}
                </div>
                <div
                  className={`flex items-center text-xs ${/\d/.test(values.password) ? "text-green-400" : "text-gray-400"}`}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {t("passwordRequirements.number")}
                </div>
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Field
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("auth.confirmPassword")}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="mt-1 text-red-400 text-sm"
              />
            </div>

            <div>
              <CustomCheckbox
                checked={values.agreeToTerms}
                onCheckedChange={(checked: boolean) =>
                  setFieldValue("agreeToTerms", checked)
                }
              >
                <span className="text-sm text-gray-300">
                  {t("auth.agreeToTerms")}{" "}
                  <Link
                    href="/terms"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                    onClick={e => e.stopPropagation()}
                  >
                    {t("auth.termsOfService")}
                  </Link>{" "}
                  {t("auth.and")}{" "}
                  <Link
                    href="/privacy"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                    onClick={e => e.stopPropagation()}
                  >
                    {t("auth.privacyPolicy")}
                  </Link>
                </span>
              </CustomCheckbox>
              <ErrorMessage
                name="agreeToTerms"
                component="div"
                className="mt-1 text-red-400 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={!Boolean(errors)}
              className="w-full cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? t("auth.creatingAccount")
                : t("auth.createAccount")}
            </button>

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

            <div className="text-center">
              <span className="text-gray-300">{t("auth.haveAccount")} </span>
              <Link
                href="/auth/signin"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                {t("auth.signIn")}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
