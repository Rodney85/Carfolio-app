import { useUser, UserButton } from "@clerk/clerk-react";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <UserButton />
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-dark-700 flex-shrink-0">
              {user.imageUrl && (
                <img 
                  src={user.imageUrl} 
                  alt={user.fullName || "User"} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{user.fullName}</h2>
              <p className="text-gray-400 mb-4">{user.primaryEmailAddress?.emailAddress}</p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                  Car Enthusiast
                </span>
                <span className="px-3 py-1 bg-dark-700 text-gray-300 rounded-full text-sm">
                  Free Plan
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">My Cars</h2>
          
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-700 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">No cars yet</h3>
            <p className="text-gray-400 mb-4">Add your first car to start showcasing your builds</p>
            <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition">
              Add Your First Car
            </button>
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Account Settings</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-dark-700">
              <div>
                <h3 className="font-medium">Profile URL</h3>
                <p className="text-sm text-gray-400">Your public profile link</p>
              </div>
              <div className="text-gray-300 flex items-center">
                <span className="text-sm">carfolio.app/{user.username || user.id.substring(0, 8)}</span>
                <button className="ml-2 text-primary-400 hover:text-primary-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-dark-700">
              <div>
                <h3 className="font-medium">Subscription</h3>
                <p className="text-sm text-gray-400">Current plan: Free</p>
              </div>
              <button className="px-3 py-1 bg-primary-500 hover:bg-primary-600 text-white text-sm rounded-lg transition">
                Upgrade
              </button>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <div>
                <h3 className="font-medium">Account Management</h3>
                <p className="text-sm text-gray-400">Update your profile details</p>
              </div>
              <button className="px-3 py-1 bg-dark-700 hover:bg-dark-600 text-white text-sm rounded-lg transition">
                Manage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
