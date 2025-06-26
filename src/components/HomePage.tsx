import React from 'react';
import { ArrowRight, Truck, Users, Leaf, Shield, Clock, Star } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function HomePage({ onGetStarted, onLogin }: HomePageProps) {
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-emerald-600" />,
      title: "Direct from Farmers",
      description: "We source fresh produce directly from local farmers, ensuring the best quality and supporting our community."
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: "Careful Packaging",
      description: "Each product is carefully selected, cleaned, and packaged with love to maintain freshness during delivery."
    },
    {
      icon: <Clock className="w-8 h-8 text-emerald-600" />,
      title: "Same Day Delivery",
      description: "Order before 2 PM and get your fresh groceries delivered the same day to your doorstep."
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Farm Fresh Selection",
      description: "Our team visits local farms early morning to handpick the freshest produce",
      image: "https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      step: "2", 
      title: "Quality Check & Cleaning",
      description: "Every item goes through rigorous quality checks and gentle cleaning process",
      image: "https://images.pexels.com/photos/4110404/pexels-photo-4110404.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      step: "3",
      title: "Eco-Friendly Packaging",
      description: "Packed in biodegradable materials to keep products fresh and protect environment",
      image: "https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      step: "4",
      title: "Doorstep Delivery",
      description: "Delivered fresh to your home with care and a smile from our delivery team",
      image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌱</span>
              </div>
              <h1 className="text-lg font-bold text-gray-900">VillageFresh</h1>
            </div>
            <button
              onClick={onLogin}
              className="text-emerald-600 font-medium text-sm hover:text-emerald-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Fresh from Farm
              <br />
              <span className="text-emerald-600">to Your Door</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Experience the freshest produce sourced directly from local farmers, 
              carefully packaged and delivered with love.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
            </div>
            <span className="text-sm text-gray-600">4.9/5 from 500+ customers</span>
          </div>

          <button
            onClick={onGetStarted}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
          >
            <span>Let's Order Fresh</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-8 bg-white">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Why Choose VillageFresh?</h3>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-8 bg-gray-50">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-8">How We Bring Freshness to You</h3>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-5 top-12 w-0.5 h-16 bg-emerald-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-8 bg-gradient-to-r from-emerald-500 to-emerald-600">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Users className="w-6 h-6 text-white" />
            <span className="text-white font-medium">Join 500+ Happy Customers</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready for Fresh Groceries?
          </h3>
          <p className="text-emerald-100 mb-6">
            Start your journey to healthier, fresher eating today
          </p>
          <button
            onClick={onGetStarted}
            className="w-full bg-white text-emerald-600 py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
          >
            <span>Start Shopping Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <div className="h-8"></div>
    </div>
  );
}