import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
// Import types from generated files (will be available when Convex server is running)
// For now, define fallback types to avoid TypeScript errors
let api: any;

// Define Id type for use in the component
type Id<T extends string> = { __tableName: T };

// Try to import from generated files if available
try {
  const apiModule = require("../../convex/_generated/api");
  api = apiModule.api;
} catch (e) {
  // Fallback typings until Convex generates the files
  api = {
    cars: { getCarById: "cars:getCarById" },
    mods: { getCarMods: "mods:getCarMods" },
    media: { getCarMedia: "media:getCarMedia" },
    analytics: { trackCarView: "analytics:trackCarView" }
  };
}
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  ChevronLeft, 
  Settings, 
  Share2, 
  Eye, 
  Calendar, 
  Car, 
  Gauge, 
  Wrench, 
  Image as ImageIcon, 
  BarChart3 
} from 'lucide-react';
import { Button } from '../shared/Button';
import { ModList } from './ModList';
import { ModForm } from './ModForm';
import { MediaUploader } from './MediaUploader';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'specs' | 'mods' | 'media' | 'insights';

export const CarDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Convert string id to Id<"cars"> type to avoid TypeScript errors
  const carId = id as unknown as Id<"cars">;
  
  const [activeTab, setActiveTab] = useState<TabType>('specs');
  const [isAddingMod, setIsAddingMod] = useState(false);
  
  // Fetch car data
  const car = useQuery(api.cars.getCarById, { 
    carId
  });
  
  // Fetch car mods
  const mods = useQuery(api.mods.getCarMods, { 
    carId
  });
  
  // Fetch car media
  const media = useQuery(api.media.getCarMedia, { 
    carId: carId as Id<'cars'> 
  });
  
  // Track car view
  const trackCarView = useMutation(api.analytics.trackCarView);
  
  // Track view on component mount
  React.useEffect(() => {
    if (carId) {
      trackCarView({ carId: carId as Id<'cars'> }).catch(console.error);
    }
  }, [carId, trackCarView]);
  
  if (!car) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-500">Loading car details...</div>
      </div>
    );
  }
  
  const handleGoBack = () => {
    navigate('/garage');
  };
  
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setIsAddingMod(false);
  };
  
  const handleAddModSuccess = () => {
    setIsAddingMod(false);
    toast.success('Mod added successfully');
  };
  
  const handleMediaUploadComplete = () => {
    toast.success('Media uploaded successfully');
  };
  
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'specs', label: 'Specs', icon: <Gauge className="h-4 w-4" /> },
    { id: 'mods', label: 'Mods', icon: <Wrench className="h-4 w-4" /> },
    { id: 'media', label: 'Media', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'insights', label: 'Insights', icon: <BarChart3 className="h-4 w-4" /> },
  ];
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleGoBack}
            className="mb-2 sm:mb-0"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{car.title}</h1>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<Share2 className="h-4 w-4" />}
          >
            Share
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<Settings className="h-4 w-4" />}
          >
            Edit
          </Button>
        </div>
      </div>
      
      {/* Car Image and Basic Info */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          {car.mainImageUrl ? (
            <img 
              src={car.mainImageUrl} 
              alt={car.title} 
              className="w-full rounded-lg object-cover aspect-video"
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800">
              <Car className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="md:col-span-2">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <div className="mb-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Car className="mr-1 h-4 w-4" />
                Make & Model
              </div>
              <div className="font-medium">
                {car.make} {car.model}
              </div>
            </div>
            
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <div className="mb-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="mr-1 h-4 w-4" />
                Year
              </div>
              <div className="font-medium">{car.year}</div>
            </div>
            
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <div className="mb-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Eye className="mr-1 h-4 w-4" />
                Views
              </div>
              <div className="font-medium">{car.views || 0}</div>
            </div>
          </div>
          
          {car.description && (
            <div className="mt-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <h3 className="mb-2 font-medium">Description</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {car.description}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Specs Tab */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Specifications</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {car.description || 'No specifications available yet.'}
              </p>
            </div>
          )}
          
          {/* Mods Tab */}
          {activeTab === 'mods' && (
            <div>
              {isAddingMod ? (
                <ModForm 
                  carId={carId as Id<'cars'>}
                  onSuccess={handleAddModSuccess}
                  onCancel={() => setIsAddingMod(false)}
                />
              ) : (
                <>
                  <div className="mb-4 flex justify-between">
                    <h2 className="text-xl font-bold">Modifications</h2>
                    <Button 
                      size="sm"
                      leftIcon={<Wrench className="h-4 w-4" />}
                      onClick={() => setIsAddingMod(true)}
                    >
                      Add Mod
                    </Button>
                  </div>
                  
                  {mods && mods.length > 0 ? (
                    <ModList mods={mods} />
                  ) : (
                    <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                      <Wrench className="mx-auto h-10 w-10 text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium">No mods yet</h3>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Start adding modifications to showcase your build.
                      </p>
                      <Button 
                        className="mt-4" 
                        onClick={() => setIsAddingMod(true)}
                      >
                        Add First Mod
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          
          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Photos & Videos</h2>
              
              <div className="mb-6">
                <MediaUploader 
                  carId={carId as Id<'cars'>}
                  onUploadComplete={handleMediaUploadComplete}
                />
              </div>
              
              {media && media.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {media.map((item: any) => (
                    <div 
                      key={item._id} 
                      className="aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800"
                    >
                      {item.type === 'image' ? (
                        <img 
                          src={item.url} 
                          alt="Car media" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <video 
                          src={item.url} 
                          controls 
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <ImageIcon className="mx-auto h-10 w-10 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium">No media yet</h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Upload images and videos to showcase your build.
                  </p>
                  <Button 
                    className="mt-4" 
                    onClick={() => setIsAddingMod(true)}
                  >
                    Add First Media
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Insights Tab */}
          {activeTab === 'insights' && (
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Analytics & Insights</h2>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Total Views
                  </div>
                  <div className="text-2xl font-bold">{car.views || 0}</div>
                </div>
                
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Mod Clicks
                  </div>
                  <div className="text-2xl font-bold">
                    {mods?.reduce((total: number, mod: any) => total + (mod.clicks || 0), 0) || 0}
                  </div>
                </div>
                
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Media Count
                  </div>
                  <div className="text-2xl font-bold">{media?.length || 0}</div>
                </div>
                
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Mod Count
                  </div>
                  <div className="text-2xl font-bold">{mods?.length || 0}</div>
                </div>
              </div>
              
              <div className="mt-8 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <h3 className="mb-4 text-lg font-medium">Advanced Analytics</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Upgrade to Pro to unlock detailed analytics including traffic sources,
                  engagement metrics, and conversion tracking.
                </p>
                <Button className="mt-4">Upgrade to Pro</Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
