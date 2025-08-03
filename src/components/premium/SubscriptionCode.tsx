// // package.json - Add premium dependencies
// {
//   "dependencies": {
//     "stripe": "^14.0.0",
//     "razorpay": "^2.9.2", // Popular in India
//     "@stripe/stripe-js": "^2.1.0",
//     "jsonwebtoken": "^9.0.2",
//     "nodemailer": "^6.9.0"
//   }
// }

// // types/subscription.ts
// export interface ISubscription {
//   _id: string;
//   userId: string;
//   plan: SubscriptionPlan;
//   status: SubscriptionStatus;
//   provider: PaymentProvider;
//   providerId: string; // Stripe/Razorpay subscription ID
//   currentPeriodStart: Date;
//   currentPeriodEnd: Date;
//   cancelAtPeriodEnd: boolean;
//   trialEnd?: Date;
//   metadata?: Record<string, any>;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export enum SubscriptionPlan {
//   FREE = 'free',
//   PREMIUM = 'premium',
//   PRO = 'pro'
// }

// export enum SubscriptionStatus {
//   ACTIVE = 'active',
//   CANCELED = 'canceled',
//   PAST_DUE = 'past_due',
//   UNPAID = 'unpaid',
//   TRIALING = 'trialing'
// }

// export enum PaymentProvider {
//   STRIPE = 'stripe',
//   RAZORPAY = 'razorpay',
//   PAYPAL = 'paypal'
// }

// export interface IPlanFeatures {
//   maxTasks: number;
//   hasSteps: boolean;
//   hasTimeTracking: boolean;
//   hasReminders: boolean;
//   hasRewards: boolean;
//   hasAnalytics: boolean;
//   hasTemplates: boolean;
//   hasCollaboration: boolean;
//   hasExport: boolean;
//   hasPrioritySupport: boolean;
//   hasCustomBranding: boolean;
// }

// export const PLAN_FEATURES: Record<SubscriptionPlan, IPlanFeatures> = {
//   [SubscriptionPlan.FREE]: {
//     maxTasks: 3,
//     hasSteps: false,
//     hasTimeTracking: false,
//     hasReminders: false,
//     hasRewards: false,
//     hasAnalytics: false,
//     hasTemplates: false,
//     hasCollaboration: false,
//     hasExport: false,
//     hasPrioritySupport: false,
//     hasCustomBranding: false
//   },
//   [SubscriptionPlan.PREMIUM]: {
//     maxTasks: 50,
//     hasSteps: true,
//     hasTimeTracking: true,
//     hasReminders: true,
//     hasRewards: true,
//     hasAnalytics: true,
//     hasTemplates: true,
//     hasCollaboration: false,
//     hasExport: false,
//     hasPrioritySupport: false,
//     hasCustomBranding: false
//   },
//   [SubscriptionPlan.PRO]: {
//     maxTasks: -1, // Unlimited
//     hasSteps: true,
//     hasTimeTracking: true,
//     hasReminders: true,
//     hasRewards: true,
//     hasAnalytics: true,
//     hasTemplates: true,
//     hasCollaboration: true,
//     hasExport: true,
//     hasPrioritySupport: true,
//     hasCustomBranding: true
//   }
// };

// export const PLAN_PRICING = {
//   [SubscriptionPlan.FREE]: { price: 0, currency: 'USD' },
//   [SubscriptionPlan.PREMIUM]: { price: 4.99, currency: 'USD' },
//   [SubscriptionPlan.PRO]: { price: 9.99, currency: 'USD' }
// };

// // models/Subscription.ts
// import mongoose, { Schema } from 'mongoose';
// import { ISubscription, SubscriptionPlan, SubscriptionStatus, PaymentProvider } from '@/types/subscription';

// interface ISubscriptionDocument extends ISubscription, Document {}

// const SubscriptionSchema: Schema<ISubscriptionDocument> = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     unique: true // One subscription per user
//   },
//   plan: {
//     type: String,
//     enum: Object.values(SubscriptionPlan),
//     default: SubscriptionPlan.FREE
//   },
//   status: {
//     type: String,
//     enum: Object.values(SubscriptionStatus),
//     default: SubscriptionStatus.ACTIVE
//   },
//   provider: {
//     type: String,
//     enum: Object.values(PaymentProvider),
//     required: function() { return this.plan !== SubscriptionPlan.FREE; }
//   },
//   providerId: {
//     type: String,
//     required: function() { return this.plan !== SubscriptionPlan.FREE; }
//   },
//   currentPeriodStart: {
//     type: Date,
//     default: Date.now
//   },
//   currentPeriodEnd: {
//     type: Date,
//     default: function() {
//       const date = new Date();
//       date.setMonth(date.getMonth() + 1);
//       return date;
//     }
//   },
//   cancelAtPeriodEnd: {
//     type: Boolean,
//     default: false
//   },
//   trialEnd: {
//     type: Date
//   },
//   metadata: {
//     type: Schema.Types.Mixed
//   }
// }, {
//   timestamps: true
// });

// // Indexes
// SubscriptionSchema.index({ userId: 1 });
// SubscriptionSchema.index({ providerId: 1 });
// SubscriptionSchema.index({ status: 1, currentPeriodEnd: 1 });

// export default mongoose.models.Subscription || mongoose.model<ISubscriptionDocument>('Subscription', SubscriptionSchema);

// // lib/subscription.ts
// import Subscription from '@/models/Subscription';
// import { SubscriptionPlan, PLAN_FEATURES, IPlanFeatures } from '@/types/subscription';

// export class SubscriptionService {
//   static async getUserSubscription(userId: string) {
//     try {
//       const subscription = await Subscription.findOne({ userId }).lean();
      
//       if (!subscription) {
//         // Create free subscription for new users
//         return await this.createFreeSubscription(userId);
//       }
      
//       // Check if subscription is expired
//       if (subscription.currentPeriodEnd < new Date() && subscription.plan !== SubscriptionPlan.FREE) {
//         await this.downgradeToFree(userId);
//         return await Subscription.findOne({ userId }).lean();
//       }
      
//       return subscription;
//     } catch (error) {
//       console.error('Error getting user subscription:', error);
//       throw error;
//     }
//   }

//   static async createFreeSubscription(userId: string) {
//     const subscription = await Subscription.create({
//       userId,
//       plan: SubscriptionPlan.FREE,
//       status: 'active',
//       currentPeriodStart: new Date(),
//       currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
//     });
    
//     return subscription;
//   }

//   static async downgradeToFree(userId: string) {
//     await Subscription.findOneAndUpdate(
//       { userId },
//       {
//         plan: SubscriptionPlan.FREE,
//         status: 'active',
//         provider: undefined,
//         providerId: undefined,
//         cancelAtPeriodEnd: false
//       }
//     );
//   }

//   static async upgradeSubscription(userId: string, plan: SubscriptionPlan, provider: string, providerId: string) {
//     const endDate = new Date();
//     endDate.setMonth(endDate.getMonth() + 1);

//     await Subscription.findOneAndUpdate(
//       { userId },
//       {
//         plan,
//         status: 'active',
//         provider,
//         providerId,
//         currentPeriodStart: new Date(),
//         currentPeriodEnd: endDate,
//         cancelAtPeriodEnd: false
//       },
//       { upsert: true }
//     );
//   }

//   static getUserFeatures(subscription: any): IPlanFeatures {
//     if (!subscription) {
//       return PLAN_FEATURES[SubscriptionPlan.FREE];
//     }
    
//     return PLAN_FEATURES[subscription.plan] || PLAN_FEATURES[SubscriptionPlan.FREE];
//   }

//   static canAccessFeature(subscription: any, feature: keyof IPlanFeatures): boolean {
//     const features = this.getUserFeatures(subscription);
//     return features[feature] as boolean;
//   }

//   static async checkTaskLimit(userId: string, currentTaskCount: number): Promise<boolean> {
//     const subscription = await this.getUserSubscription(userId);
//     const features = this.getUserFeatures(subscription);
    
//     if (features.maxTasks === -1) return true; // Unlimited
//     return currentTaskCount < features.maxTasks;
//   }
// }

// // lib/payments/stripe.ts
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2023-10-16'
// });

// export class StripeService {
//   static async createCheckoutSession(userId: string, plan: SubscriptionPlan, successUrl: string, cancelUrl: string) {
//     try {
//       const priceId = this.getPriceId(plan);
      
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [
//           {
//             price: priceId,
//             quantity: 1,
//           },
//         ],
//         mode: 'subscription',
//         success_url: successUrl,
//         cancel_url: cancelUrl,
//         client_reference_id: userId,
//         metadata: {
//           userId,
//           plan
//         }
//       });

//       return session;
//     } catch (error) {
//       console.error('Error creating Stripe checkout session:', error);
//       throw error;
//     }
//   }

//   static async createCustomerPortalSession(customerId: string, returnUrl: string) {
//     const session = await stripe.billingPortal.sessions.create({
//       customer: customerId,
//       return_url: returnUrl,
//     });

//     return session;
//   }

//   static async cancelSubscription(subscriptionId: string) {
//     await stripe.subscriptions.update(subscriptionId, {
//       cancel_at_period_end: true
//     });
//   }

//   static async reactivateSubscription(subscriptionId: string) {
//     await stripe.subscriptions.update(subscriptionId, {
//       cancel_at_period_end: false
//     });
//   }

//   private static getPriceId(plan: SubscriptionPlan): string {
//     const priceIds = {
//       [SubscriptionPlan.PREMIUM]: process.env.STRIPE_PREMIUM_PRICE_ID!,
//       [SubscriptionPlan.PRO]: process.env.STRIPE_PRO_PRICE_ID!
//     };
    
//     return priceIds[plan];
//   }
// }

// // lib/payments/razorpay.ts (Popular in India)
// import Razorpay from 'razorpay';

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!
// });

// export class RazorpayService {
//   static async createSubscription(userId: string, plan: SubscriptionPlan) {
//     try {
//       const planId = this.getPlanId(plan);
      
//       const subscription = await razorpay.subscriptions.create({
//         plan_id: planId,
//         customer_notify: 1,
//         total_count: 12, // 12 months
//         notes: {
//           userId,
//           plan
//         }
//       });

//       return subscription;
//     } catch (error) {
//       console.error('Error creating Razorpay subscription:', error);
//       throw error;
//     }
//   }

//   static async cancelSubscription(subscriptionId: string) {
//     await razorpay.subscriptions.cancel(subscriptionId, true);
//   }

//   private static getPlanId(plan: SubscriptionPlan): string {
//     const planIds = {
//       [SubscriptionPlan.PREMIUM]: process.env.RAZORPAY_PREMIUM_PLAN_ID!,
//       [SubscriptionPlan.PRO]: process.env.RAZORPAY_PRO_PLAN_ID!
//     };
    
//     return planIds[plan];
//   }
// }

// // middleware/premiumGuard.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { SubscriptionService } from '@/lib/subscription';
// import { getUserFromToken } from '@/lib/middleware';

// export async function premiumGuard(
//   request: NextRequest,
//   requiredFeature: keyof IPlanFeatures
// ): Promise<{ allowed: boolean; response?: NextResponse }> {
//   try {
//     const userId = getUserFromToken(request);
//     if (!userId) {
//       return {
//         allowed: false,
//         response: NextResponse.json(
//           { success: false, error: 'Authentication required' },
//           { status: 401 }
//         )
//       };
//     }

//     const subscription = await SubscriptionService.getUserSubscription(userId);
//     const hasFeature = SubscriptionService.canAccessFeature(subscription, requiredFeature);

//     if (!hasFeature) {
//       return {
//         allowed: false,
//         response: NextResponse.json(
//           { 
//             success: false, 
//             error: 'Premium feature required',
//             upgrade: true,
//             feature: requiredFeature
//           },
//           { status: 403 }
//         )
//       };
//     }

//     return { allowed: true };
//   } catch (error) {
//     return {
//       allowed: false,
//       response: NextResponse.json(
//         { success: false, error: 'Subscription check failed' },
//         { status: 500 }
//       )
//     };
//   }
// }

// // app/api/subscription/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { getUserFromToken } from '@/lib/middleware';
// import { SubscriptionService } from '@/lib/subscription';
// import dbConnect from '@/lib/mongodb';

// export async function GET(request: NextRequest) {
//   try {
//     await dbConnect();
    
//     const userId = getUserFromToken(request);
//     if (!userId) {
//       return NextResponse.json(
//         { success: false, error: 'Authentication required' },
//         { status: 401 }
//       );
//     }

//     const subscription = await SubscriptionService.getUserSubscription(userId);
//     const features = SubscriptionService.getUserFeatures(subscription);

//     return NextResponse.json({
//       success: true,
//       data: {
//         subscription,
//         features,
//         limits: {
//           tasksUsed: 0, // Calculate actual usage
//           tasksLimit: features.maxTasks
//         }
//       }
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: 'Failed to get subscription' },
//       { status: 500 }
//     );
//   }
// }

// // app/api/subscription/checkout/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { getUserFromToken } from '@/lib/middleware';
// import { StripeService } from '@/lib/payments/stripe';
// import { RazorpayService } from '@/lib/payments/razorpay';
// import { SubscriptionPlan, PaymentProvider } from '@/types/subscription';

// export async function POST(request: NextRequest) {
//   try {
//     const userId = getUserFromToken(request);
//     if (!userId) {
//       return NextResponse.json(
//         { success: false, error: 'Authentication required' },
//         { status: 401 }
//       );
//     }

//     const { plan, provider, successUrl, cancelUrl } = await request.json();

//     let session;
    
//     if (provider === PaymentProvider.STRIPE) {
//       session = await StripeService.createCheckoutSession(
//         userId,
//         plan as SubscriptionPlan,
//         successUrl,
//         cancelUrl
//       );
//     } else if (provider === PaymentProvider.RAZORPAY) {
//       session = await RazorpayService.createSubscription(userId, plan as SubscriptionPlan);
//     } else {
//       return NextResponse.json(
//         { success: false, error: 'Unsupported payment provider' },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: session
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: 'Failed to create checkout session' },
//       { status: 500 }
//     );
//   }
// }

// // app/api/webhooks/stripe/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import Stripe from 'stripe';
// import { SubscriptionService } from '@/lib/subscription';
// import { SubscriptionPlan } from '@/types/subscription';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.text();
//     const signature = request.headers.get('stripe-signature')!;

//     const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

//     switch (event.type) {
//       case 'checkout.session.completed':
//         await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
//         break;
      
//       case 'invoice.payment_succeeded':
//         await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
//         break;
      
//       case 'invoice.payment_failed':
//         await handlePaymentFailed(event.data.object as Stripe.Invoice);
//         break;
      
//       case 'customer.subscription.deleted':
//         await handleSubscriptionCanceled(event.data.object as Stripe.Subscription);
//         break;
//     }

//     return NextResponse.json({ received: true });
//   } catch (error) {
//     console.error('Stripe webhook error:', error);
//     return NextResponse.json(
//       { error: 'Webhook processing failed' },
//       { status: 400 }
//     );
//   }
// }

// async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
//   const userId = session.client_reference_id;
//   const plan = session.metadata?.plan as SubscriptionPlan;
  
//   if (userId && plan && session.subscription) {
//     await SubscriptionService.upgradeSubscription(
//       userId,
//       plan,
//       'stripe',
//       session.subscription as string
//     );
//   }
// }

// async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
//   // Handle successful recurring payment
//   console.log('Payment succeeded for subscription:', invoice.subscription);
// }

// async function handlePaymentFailed(invoice: Stripe.Invoice) {
//   // Handle failed payment - maybe send email notification
//   console.log('Payment failed for subscription:', invoice.subscription);
// }

// async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
//   // Find user by subscription ID and downgrade to free
//   const userSubscription = await Subscription.findOne({ 
//     providerId: subscription.id 
//   });
  
//   if (userSubscription) {
//     await SubscriptionService.downgradeToFree(userSubscription.userId);
//   }
// }

// // contexts/SubscriptionContext.tsx
// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { ISubscription, IPlanFeatures } from '@/types/subscription';

// interface SubscriptionContextType {
//   subscription: ISubscription | null;
//   features: IPlanFeatures | null;
//   loading: boolean;
//   refreshSubscription: () => Promise<void>;
//   canAccessFeature: (feature: keyof IPlanFeatures) => boolean;
//   upgradeRequired: (feature: keyof IPlanFeatures) => boolean;
// }

// const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// interface SubscriptionProviderProps {
//   children: ReactNode;
// }

// export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
//   const [subscription, setSubscription] = useState<ISubscription | null>(null);
//   const [features, setFeatures] = useState<IPlanFeatures | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { user, isAuthenticated } = useAuth();

//   const fetchSubscription = async () => {
//     if (!isAuthenticated) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('/api/subscription', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         setSubscription(data.data.subscription);
//         setFeatures(data.data.features);
//       }
//     } catch (error) {
//       console.error('Error fetching subscription:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const canAccessFeature = (feature: keyof IPlanFeatures): boolean => {
//     if (!features) return false;
//     return features[feature] as boolean;
//   };

//   const upgradeRequired = (feature: keyof IPlanFeatures): boolean => {
//     return !canAccessFeature(feature);
//   };

//   useEffect(() => {
//     fetchSubscription();
//   }, [isAuthenticated]);

//   const value: SubscriptionContextType = {
//     subscription,
//     features,
//     loading,
//     refreshSubscription: fetchSubscription,
//     canAccessFeature,
//     upgradeRequired,
//   };

//   return (
//     <SubscriptionContext.Provider value={value}>
//       {children}
//     </SubscriptionContext.Provider>
//   );
// };

// export const useSubscription = (): SubscriptionContextType => {
//   const context = useContext(SubscriptionContext);
//   if (context === undefined) {
//     throw new Error('useSubscription must be used within a SubscriptionProvider');
//   }
//   return context;
// };

// // components/premium/PricingModal.tsx
// 'use client';

// import React, { useState } from 'react';
// import { useSubscription } from '@/contexts/SubscriptionContext';
// import { SubscriptionPlan, PaymentProvider, PLAN_PRICING } from '@/types/subscription';

// interface PricingModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedFeature?: string;
// }

// const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, selectedFeature }) => {
//   const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(SubscriptionPlan.PREMIUM);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const { refreshSubscription } = useSubscription();

//   const handleUpgrade = async (provider: PaymentProvider) => {
//     setIsProcessing(true);
    
//     try {
//       const response = await fetch('/api/subscription/checkout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({
//           plan: selectedPlan,
//           provider,
//           successUrl: `${window.location.origin}/subscription/success`,
//           cancelUrl: `${window.location.origin}/subscription/canceled`
//         })
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         if (provider === PaymentProvider.STRIPE) {
//           // Redirect to Stripe Checkout
//           window.location.href = data.data.url;
//         } else if (provider === PaymentProvider.RAZORPAY) {
//           // Handle Razorpay checkout
//           handleRazorpayCheckout(data.data);
//         }
//       }
//     } catch (error) {
//       console.error('Error creating checkout:', error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleRazorpayCheckout = (subscription: any) => {
//     const options = {
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//       subscription_id: subscription.id,
//       name: 'Streak Tracker',
//       description: `${selectedPlan} Subscription`,
//       handler: async function (response: any) {
//         // Handle successful payment
//         await refreshSubscription();
//         onClose();
//       },
//       prefill: {
//         name: 'User Name',
//         email: 'user@example.com'
//       }
//     };

//     const rzp = new (window as any).Razorpay(options);
//     rzp.open();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-bold">Unlock Premium Features</h2>
//               {selectedFeature && (
//                 <p className="text-blue-100 mt-1">
//                   You need {selectedFeature} to continue
//                 </p>
//               )}
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//             >
//               <XIcon className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         {/* Pricing Plans */}
//         <div className="p-6">
//           <div className="grid md:grid-cols-3 gap-6">
//             {/* Free Plan */}
//             <PricingPlanCard
//               plan={SubscriptionPlan.FREE}
//               price={PLAN_PRICING[SubscriptionPlan.FREE].price}
//               features={[
//                 '3 tasks maximum',
//                 'Basic streak tracking',
//                 'Simple completion',
//                 'Limited analytics'
//               ]}
//               buttonText="Current Plan"
//               disabled
//               popular={false}
//             />

//             {/* Premium Plan */}
//             <PricingPlanCard
//               plan={SubscriptionPlan.PREMIUM}
//               price={PLAN_PRICING[SubscriptionPlan.PREMIUM].price}
//               features={[
//                 'Up to 50 tasks',
//                 'Step-by-step completion',
//                 'Time tracking',
//                 'Rewards & badges',
//                 'Smart reminders',
//                 'Advanced analytics',
//                 'Task templates'
//               ]}
//               buttonText="Upgrade to Premium"
//               onSelect={() => setSelectedPlan(SubscriptionPlan.PREMIUM)}
//               selected={selectedPlan === SubscriptionPlan.PREMIUM}
//               popular={true}
//             />

//             {/* Pro Plan */}
//             <PricingPlanCard
//               plan={SubscriptionPlan.PRO}
//               price={PLAN_PRICING[SubscriptionPlan.PRO].price}
//               features={[
//                 'Unlimited tasks',
//                 'All Premium features',
//                 'Team collaboration',
//                 'Data export',
//                 'Priority support',
//                 'Custom branding',
//                 'API access'
//               ]}
//               buttonText="Upgrade to Pro"
//               onSelect={() => setSelectedPlan(SubscriptionPlan.PRO)}
//               selected={selectedPlan === SubscriptionPlan.PRO}
//               popular={false}
//             />
//           </div>

//           {/* Payment Options */}
//           {selectedPlan !== SubscriptionPlan.FREE && (
//             <div className="mt-8 p-6 bg-gray-50 rounded-xl">
//               <h3 className="text-lg font-bold text-gray-800 mb-4">Choose Payment Method</h3>
//               <div className="grid md:grid-cols-2 gap-4">
//                 <button
//                   onClick={() => handleUpgrade(PaymentProvider.STRIPE)}
//                   disabled={isProcessing}
//                   className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50"
//                 >
//                   <img src="/stripe-logo.png" alt="Stripe" className="h-6 mr-3" />
//                   <span className="font-medium">Pay with Stripe</span>
//                 </button>
                
//                 <button
//                   onClick={() => handleUpgrade(PaymentProvider.RAZORPAY)}
//                   disabled={isProcessing}
//                   className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50"
//                 >
//                   <img src="/razorpay-logo.png" alt="Razorpay" className="h-6 mr-3" />
//                   <span className="font-medium">Pay with Razorpay</span>
//                 </button>
//               </div>
              
//               <p className="text-sm text-gray-600 mt-4 text-center">
//                 💳 Secure payment processing • 🔒 SSL encrypted • 📱 Mobile friendly
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // components/premium/PricingPlanCard.tsx
// interface PricingPlanCardProps {
//   plan: SubscriptionPlan;
//   price: number;
//   features: string[];
//   buttonText: string;
//   onSelect?: () => void;
//   selected?: boolean;
//   disabled?: boolean;
//   popular?: boolean;
// }

// const PricingPlanCard: React.FC<PricingPlanCardProps> = ({
//   plan,
//   price,
//   features,
//   buttonText,
//   onSelect,
//   selected = false,
//   disabled = false,
//   popular = false
// }) => {
//   return (
//     <div className={`relative p-6 rounded-xl border-2 transition-all ${
//       popular 
//         ? 'border-blue-500 bg-blue-50 scale-105' 
//         : selected 
//         ? 'border-blue-500 bg-blue-50' 
//         : 'border-gray-200 bg-white hover:border-gray-300'
//     }`}>
//       {popular && (
//         <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//           <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold">
//             Most Popular
//           </span>
//         </div>
//       )}
      
//       <div className="text-center mb-6">
//         <h3 className="text-xl font-bold text-gray-800 mb-2">
//           {plan.charAt(0).toUpperCase() + plan.slice(1)}
//         </h3>
//         <div className="text-3xl font-bold text-gray-800">
//           {price === 0 ? 'Free' : `${price}`}
//           {price > 0 && <span className="text-sm text-gray-600 font-normal">/month</span>}
//         </div>
//       </div>

//       <ul className="space-y-3 mb-6">
//         {features.map((feature, index) => (
//           <li key={index} className="flex items-center text-sm">
//             <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
//             <span className="text-gray-600">{feature}</span>
//           </li>
//         ))}
//       </ul>

//       <button
//         onClick={onSelect}
//         disabled={disabled}
//         className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
//           disabled
//             ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//             : selected || popular
//             ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
//             : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//         }`}
//       >
//         {buttonText}
//       </button>
//     </div>
//   );
// };

// // components/premium/FeatureGate.tsx
// 'use client';

// import React, { useState } from 'react';
// import { useSubscription } from '@/contexts/SubscriptionContext';
// import PricingModal from './PricingModal';
// import { IPlanFeatures } from '@/types/subscription';

// interface FeatureGateProps {
//   feature: keyof IPlanFeatures;
//   children: React.ReactNode;
//   fallback?: React.ReactNode;
//   showUpgradeButton?: boolean;
// }

// const FeatureGate: React.FC<FeatureGateProps> = ({ 
//   feature, 
//   children, 
//   fallback,
//   showUpgradeButton = true 
// }) => {
//   const [showPricing, setShowPricing] = useState(false);
//   const { canAccessFeature, loading } = useSubscription();

//   if (loading) {
//     return <div className="animate-pulse bg-gray-200 rounded h-8 w-full" />;
//   }

//   const hasAccess = canAccessFeature(feature);

//   if (hasAccess) {
//     return <>{children}</>;
//   }

//   if (fallback) {
//     return <>{fallback}</>;
//   }

//   return (
//     <div className="relative">
//       {/* Blurred/Disabled Content */}
//       <div className="pointer-events-none opacity-50 filter blur-sm">
//         {children}
//       </div>

//       {/* Upgrade Overlay */}
//       <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl">
//         <div className="text-center p-6">
//           <div className="text-4xl mb-3">🔒</div>
//           <h3 className="text-lg font-bold text-gray-800 mb-2">
//             Premium Feature
//           </h3>
//           <p className="text-gray-600 mb-4">
//             Upgrade to access {feature.replace(/([A-Z])/g, ' $1').toLowerCase()}
//           </p>
//           {showUpgradeButton && (
//             <button
//               onClick={() => setShowPricing(true)}
//               className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
//             >
//               Upgrade Now
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Pricing Modal */}
//       <PricingModal
//         isOpen={showPricing}
//         onClose={() => setShowPricing(false)}
//         selectedFeature={feature}
//       />
//     </div>
//   );
// };

// // components/premium/UsageLimits.tsx
// 'use client';

// import React from 'react';
// import { useSubscription } from '@/contexts/SubscriptionContext';

// interface UsageLimitsProps {
//   currentUsage: number;
//   featureType: 'tasks' | 'steps' | 'reminders';
// }

// const UsageLimits: React.FC<UsageLimitsProps> = ({ currentUsage, featureType }) => {
//   const { features, subscription } = useSubscription();

//   if (!features) return null;

//   const limits = {
//     tasks: features.maxTasks,
//     steps: features.hasSteps ? -1 : 0,
//     reminders: features.hasReminders ? -1 : 0
//   };

//   const limit = limits[featureType];
//   const isUnlimited = limit === -1;
//   const percentage = !isUnlimited ? (currentUsage / limit) * 100 : 0;
//   const isNearLimit = percentage > 80;
//   const isAtLimit = currentUsage >= limit && !isUnlimited;

//   if (isUnlimited) {
//     return (
//       <div className="flex items-center text-sm text-green-600">
//         <span className="mr-2">∞</span>
//         <span>Unlimited {featureType}</span>
//       </div>
//     );
//   }

//   return (
//     <div className={`text-sm ${isAtLimit ? 'text-red-600' : isNearLimit ? 'text-orange-600' : 'text-gray-600'}`}>
//       <div className="flex items-center justify-between mb-1">
//         <span>{currentUsage} / {limit} {featureType}</span>
//         <span>{Math.round(percentage)}%</span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-2">
//         <div 
//           className={`h-2 rounded-full transition-all ${
//             isAtLimit ? 'bg-red-500' : isNearLimit ? 'bg-orange-500' : 'bg-green-500'
//           }`}
//           style={{ width: `${Math.min(percentage, 100)}%` }}
//         />
//       </div>
//       {isAtLimit && (
//         <p className="text-xs mt-1 font-medium">Upgrade to add more {featureType}</p>
//       )}
//     </div>
//   );
// };

// // hooks/usePremiumFeature.ts
// 'use client';

// import { useState } from 'react';
// import { useSubscription } from '@/contexts/SubscriptionContext';
// import { IPlanFeatures } from '@/types/subscription';

// export const usePremiumFeature = (feature: keyof IPlanFeatures) => {
//   const [showUpgradeModal, setShowUpgradeModal] = useState(false);
//   const { canAccessFeature } = useSubscription();

//   const checkFeatureAccess = (): boolean => {
//     const hasAccess = canAccessFeature(feature);
//     if (!hasAccess) {
//       setShowUpgradeModal(true);
//       return false;
//     }
//     return true;
//   };

//   return {
//     hasAccess: canAccessFeature(feature),
//     checkFeatureAccess,
//     showUpgradeModal,
//     setShowUpgradeModal
//   };
// };

// // app/api/tasks/route.ts (Updated with premium limits)
// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
// import Task from '@/models/Task';
// import { getUserFromToken } from '@/lib/middleware';
// import { SubscriptionService } from '@/lib/subscription';
// import { premiumGuard } from '@/middleware/premiumGuard';
// import { ApiResponse, ITask, CreateTaskData } from '@/types';

// export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<ITask>>> {
//   try {
//     await dbConnect();
    
//     const userId = getUserFromToken(request);
//     if (!userId) {
//       return NextResponse.json(
//         { success: false, error: 'Authentication required' },
//         { status: 401 }
//       );
//     }

//     const taskData: CreateTaskData = await request.json();
    
//     // Check if user is trying to create a premium task
//     if (taskData.hasSteps || taskData.isPremium) {
//       const guard = await premiumGuard(request, 'hasSteps');
//       if (!guard.allowed) {
//         return guard.response!;
//       }
//     }

//     // Check task limits
//     const currentTaskCount = await Task.countDocuments({ userId, isActive: true });
//     const canCreateTask = await SubscriptionService.checkTaskLimit(userId, currentTaskCount);
    
//     if (!canCreateTask) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'Task limit reached',
//           upgrade: true,
//           feature: 'maxTasks'
//         },
//         { status: 403 }
//       );
//     }

//     // Validate required fields
//     if (!taskData.title?.trim() || !taskData.description?.trim()) {
//       return NextResponse.json(
//         { success: false, error: 'Title and description are required' },
//         { status: 400 }
//       );
//     }

//     const task = await Task.create({
//       ...taskData,
//       userId,
//     });
    
//     const taskResponse = await Task.findById(task._id).lean<ITask>();
    
//     return NextResponse.json(
//       { success: true, data: taskResponse },
//       { status: 201 }
//     );
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json(
//       { success: false, error: errorMessage },
//       { status: 400 }
//     );
//   }
// }

// // app/subscription/success/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSubscription } from '@/contexts/SubscriptionContext';

// export default function SubscriptionSuccessPage() {
//   const router = useRouter();
//   const { refreshSubscription } = useSubscription();

//   useEffect(() => {
//     // Refresh subscription data
//     refreshSubscription();
    
//     // Redirect to dashboard after 3 seconds
//     const timer = setTimeout(() => {
//       router.push('/');
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
//       <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 max-w-md">
//         <div className="text-6xl mb-4">🎉</div>
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">
//           Welcome to Premium!
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Your subscription has been activated successfully. You now have access to all premium features!
//         </p>
        
//         <div className="space-y-3 text-left mb-6">
//           <div className="flex items-center text-green-600">
//             <CheckIcon className="w-5 h-5 mr-2" />
//             <span>Step-by-step task completion</span>
//           </div>
//           <div className="flex items-center text-green-600">
//             <CheckIcon className="w-5 h-5 mr-2" />
//             <span>Time tracking & analytics</span>
//           </div>
//           <div className="flex items-center text-green-600">
//             <CheckIcon className="w-5 h-5 mr-2" />
//             <span>Rewards & badges</span>
//           </div>
//           <div className="flex items-center text-green-600">
//             <CheckIcon className="w-5 h-5 mr-2" />
//             <span>Smart reminders</span>
//           </div>
//         </div>

//         <button
//           onClick={() => router.push('/')}
//           className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
//         >
//           Start Using Premium Features
//         </button>
//       </div>
//     </div>
//   );
// }

// // app/layout.tsx (Updated with SubscriptionProvider)
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import { AuthProvider } from '@/contexts/AuthContext';
// import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
// import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Streak Tracker - Build Daily Habits',
//   description: 'Track your daily habits and build lasting streaks with premium step-by-step features.',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <AuthProvider>
//           <SubscriptionProvider>
//             {children}
//           </SubscriptionProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

// // components/premium/PremiumTaskCard.tsx (Usage Example)
// 'use client';

// import React from 'react';
// import { useSubscription } from '@/contexts/SubscriptionContext';
// import FeatureGate from './FeatureGate';
// import StepBasedTaskCard from './StepBasedTaskCard';
// import { IEnhancedTask } from '@/types';

// interface PremiumTaskCardProps {
//   task: IEnhancedTask;
//   onStepComplete: (taskId: string, stepNumber: number) => Promise<void>;
//   onTaskComplete: (taskId: string) => Promise<void>;
//   onDelete: (taskId: string) => Promise<void>;
// }

// const PremiumTaskCard: React.FC<PremiumTaskCardProps> = (props) => {
//   const { task } = props;

//   // If task has steps, gate it behind premium feature
//   if (task.premiumFeatures?.hasSteps) {
//     return (
//       <FeatureGate 
//         feature="hasSteps"
//         fallback={<BasicTaskCard {...props} />}
//       >
//         <StepBasedTaskCard {...props} />
//       </FeatureGate>
//     );
//   }

//   return <BasicTaskCard {...props} />;
// };

// // Basic fallback component for non-premium users
// const BasicTaskCard: React.FC<PremiumTaskCardProps> = ({ task, onTaskComplete, onDelete }) => {
//   return (
//     <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
//       <h3 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h3>
//       <p className="text-gray-600 mb-4">{task.description}</p>
      
//       <button
//         onClick={() => onTaskComplete(task._id)}
//         className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
//       >
//         Mark Complete
//       </button>
//     </div>
//   );
// };

// // Icon Components
// const CheckIcon: React.FC<{ className: string }> = ({ className }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 20 20">
//     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//   </svg>
// );

// const XIcon: React.FC<{ className: string }> = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//   </svg>
// );

// export { PricingModal, FeatureGate, UsageLimits, usePremiumFeature };