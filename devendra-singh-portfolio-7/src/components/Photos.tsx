import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Plus, X, Heart, MapPin, Sliders, Image as ImageIcon, Sparkles, Filter, Trash2, Calendar, Lock, Unlock, ShieldAlert, KeyRound, Check, LogOut, Info } from "lucide-react";

interface Photo {
  id: string;
  title: string;
  caption: string;
  category: string;
  url: string;
  location: string;
  date: string;
  camera: string;
  settings: string;
  likes: number;
}

const DEFAULT_PHOTOS: Photo[] = [
  {
    id: "photo-1",
    title: "Chasing Neon Rain",
    caption: "A midnight rain shower turns Tokyo’s alleys into a canvas of reflection and neon hues.",
    category: "Street",
    url: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=1200",
    location: "Shinjuku, Tokyo",
    date: "2026-04-12",
    camera: "Sony Alpha 7IV",
    settings: "35mm • f/1.8 • 1/160s • ISO 800",
    likes: 124,
  },
  {
    id: "photo-2",
    title: "Geometry of Light",
    caption: "Minimalist concrete shadows creating perfect symphonies at the art museum.",
    category: "Architecture",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    location: "Ando Museum, Naoshima",
    date: "2026-05-02",
    camera: "Fujifilm X-T5",
    settings: "18-55mm • f/4.0 • 1/500s • ISO 160",
    likes: 98,
  },
  {
    id: "photo-3",
    title: "Whispering Dunes",
    caption: "Winds carving infinite crests and micro-shadows at golden hour.",
    category: "Landscape",
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200",
    location: "Death Valley, California",
    date: "2026-03-24",
    camera: "Sony Alpha 7IV",
    settings: "70-200mm • f/8.0 • 1/250s • ISO 100",
    likes: 156,
  },
  {
    id: "photo-4",
    title: "Embers of Soul",
    caption: "Vibrant golden backlit silhouette expressing the beauty of natural hair.",
    category: "Portrait",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200",
    location: "Cape Town Studio",
    date: "2026-05-15",
    camera: "Canon EOS R5",
    settings: "85mm • f/1.2 • 1/400s • ISO 100",
    likes: 210,
  },
  {
    id: "photo-5",
    title: "Mystic Forest Glow",
    caption: "Sunbeams breaking through ancient pine trees in foggy mountain mornings.",
    category: "Landscape",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1200",
    location: "Black Forest, Germany",
    date: "2026-02-18",
    camera: "Fujifilm X-T5",
    settings: "23mm • f/5.6 • 1/125s • ISO 200",
    likes: 142,
  },
  {
    id: "photo-6",
    title: "Midnight Cyber Train",
    caption: "Motion blur capture of the high speed urban rail under neon-soaked arches.",
    category: "Street",
    url: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80&w=1200",
    location: "Seoul, South Korea",
    date: "2026-01-30",
    camera: "Sony Alpha 7IV",
    settings: "24mm • f/2.8 • 1/15s • ISO 1600",
    likes: 189,
  }
];

const PRESET_IMAGE_OPTIONS = [
  { name: "Urban Dusk", url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=1200" },
  { name: "Serene Lake", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200" },
  { name: "Deep Forest", url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1200" },
  { name: "Desert Stars", url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=1200" },
  { name: "Retro Vibe", url: "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&q=80&w=1200" },
];

export default function Photos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  // New form state
  const [newTitle, setNewTitle] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newCategory, setNewCategory] = useState("Street");
  const [newUrl, setNewUrl] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newCamera, setNewCamera] = useState("Sony Alpha 7IV");
  const [newSettings, setNewSettings] = useState("35mm • f/1.8 • 1/125s • ISO 400");
  const [fileBase64, setFileBase64] = useState<string | null>(null);

  // Owner mode state to restrict posting and deleting to the owner only
  const [isOwner, setIsOwner] = useState(() => {
    return localStorage.getItem("is_devendra_owner") === "true";
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPasscode, setAuthPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState(false);
  const [pendingAction, setPendingAction] = useState<"post" | string | null>(null);

  // Track the visitor's locally liked photos so hearts toggle cleanly
  const [userLikes, setUserLikes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("devendra_user_likes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveUserLikes = (likedIds: string[]) => {
    setUserLikes(likedIds);
    localStorage.setItem("devendra_user_likes", JSON.stringify(likedIds));
  };

  // Load photos from LocalStorage or default
  useEffect(() => {
    const saved = localStorage.getItem("devendra_photography");
    if (saved) {
      try {
        setPhotos(JSON.parse(saved));
      } catch (e) {
        setPhotos(DEFAULT_PHOTOS);
      }
    } else {
      setPhotos(DEFAULT_PHOTOS);
      localStorage.setItem("devendra_photography", JSON.stringify(DEFAULT_PHOTOS));
    }
  }, []);

  const saveToStorage = (updatedList: Photo[]) => {
    setPhotos(updatedList);
    localStorage.setItem("devendra_photography", JSON.stringify(updatedList));
  };

  const handleLogout = () => {
    setIsOwner(false);
    localStorage.removeItem("is_devendra_owner");
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authPasscode.trim() === "dev2026") {
      setAuthSuccess(true);
      setAuthError("");
      setTimeout(() => {
        setIsOwner(true);
        localStorage.setItem("is_devendra_owner", "true");
        setShowAuthModal(false);
        setAuthSuccess(false);
        setAuthPasscode("");
        
        // If there was a pending action, execute it smoothly
        if (pendingAction === "post") {
          setShowAddModal(true);
        } else if (pendingAction?.startsWith("delete_")) {
          const idToDelete = pendingAction.replace("delete_", "");
          const updated = photos.filter(p => p.id !== idToDelete);
          saveToStorage(updated);
          if (selectedPhoto?.id === idToDelete) {
            setSelectedPhoto(null);
          }
        }
        setPendingAction(null);
      }, 1000);
    } else {
      setAuthError("Incorrect passcode. Please try again.");
    }
  };

  const handleTryPost = () => {
    if (isOwner) {
      setShowAddModal(true);
    } else {
      setPendingAction("post");
      setShowAuthModal(true);
    }
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const alreadyLiked = userLikes.includes(id);
    let nextLikes = userLikes;

    if (alreadyLiked) {
      nextLikes = userLikes.filter(item => item !== id);
    } else {
      nextLikes = [...userLikes, id];
    }
    saveUserLikes(nextLikes);

    const updated = photos.map(p => {
      if (p.id === id) {
        const updatedPhoto = { ...p, likes: alreadyLiked ? Math.max(0, p.likes - 1) : p.likes + 1 };
        if (selectedPhoto?.id === id) {
          setSelectedPhoto(updatedPhoto);
        }
        return updatedPhoto;
      }
      return p;
    });
    saveToStorage(updated);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOwner) {
      setPendingAction(`delete_${id}`);
      setShowAuthModal(true);
      return;
    }
    if (window.confirm("Are you sure you want to delete this photo from your gallery?")) {
      const updated = photos.filter(p => p.id !== id);
      saveToStorage(updated);
      if (selectedPhoto?.id === id) {
        setSelectedPhoto(null);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileBase64(reader.result as string);
        setNewUrl(""); // Clear URL input if file is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const finalImage = fileBase64 || newUrl || "https://images.unsplash.com/photo-1554080353-a576cf803bda";

    const newPhotoItem: Photo = {
      id: `photo-${Date.now()}`,
      title: newTitle,
      caption: newCaption || "A beautifully captured creative composition.",
      category: newCategory,
      url: finalImage,
      location: newLocation || "Unknown",
      date: new Date().toISOString().split('T')[0],
      camera: newCamera,
      settings: newSettings,
      likes: 0
    };

    const updated = [newPhotoItem, ...photos];
    saveToStorage(updated);

    // Reset Form & Close
    setNewTitle("");
    setNewCaption("");
    setNewUrl("");
    setFileBase64(null);
    setNewLocation("");
    setShowAddModal(false);
  };

  // Get unique categories
  const categories = ["All", "Street", "Architecture", "Landscape", "Portrait", "Experimental"];

  const filteredPhotos = activeCategory === "All" 
    ? photos 
    : photos.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="photos" className="py-24 px-6 relative bg-gradient-to-b from-white to-pink-50/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Decorative Doodles Background */}
        <div className="absolute top-24 left-10 pointer-events-none opacity-20 select-none animate-float hidden md:block">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path d="M10,50 Q30,20 50,50 T90,50" stroke="#ff3ea5" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="20" cy="30" r="4" fill="#ff3ea5" />
            <circle cx="80" cy="70" r="4" fill="#ff3ea5" />
          </svg>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-3 mb-3 shrink-0">
              <p className="text-accent-pink text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center md:justify-start gap-2">
                <Camera className="w-4 h-4" /> Photography Showcase
              </p>
              
              <div className="inline-flex items-center justify-center gap-1.5 self-center">
                <button
                  onClick={() => {
                    if (isOwner) {
                      handleLogout();
                    } else {
                      setPendingAction(null);
                      setShowAuthModal(true);
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                    isOwner 
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60 hover:bg-emerald-100" 
                      : "bg-amber-50 text-amber-600 border border-amber-200/60 hover:bg-amber-100"
                  }`}
                  title={isOwner ? "Lock and enter Visitor Mode" : "Click to unlock owner features"}
                >
                  {isOwner ? (
                    <>
                      <Unlock className="w-3 h-3" /> Owner Active
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3" /> Visitor Mode
                    </>
                  )}
                </button>
                {isOwner && (
                  <button
                    onClick={handleLogout}
                    className="p-1 rounded-full text-black/30 hover:text-red-500 hover:bg-red-50/50 transition-colors"
                    title="Lock gallery"
                  >
                    <LogOut className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-display font-black tracking-tight"
            >
              Creative <span className="text-accent-pink">Gallery</span>
            </motion.h2>
            <p className="text-black/50 text-sm md:text-base mt-3 max-w-xl">
              Capturing freeze-frame stories, visual geometries, and high-intensity neon reflections through the lens.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTryPost}
            className="flex items-center gap-2 bg-gradient-to-r from-accent-pink to-pink-600 text-white px-8 py-4 rounded-3xl font-bold uppercase text-xs tracking-widest shadow-lg shadow-accent-pink/20 hover:shadow-accent-pink/40 hover:-translate-y-0.5 transition-all self-center md:self-end"
          >
            <Plus className="w-4 h-4" /> Post New Photo
          </motion.button>
        </div>

        {/* Filtering Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-black text-white shadow-md scale-105"
                  : "bg-black/5 text-black/60 hover:bg-black/10 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20 bg-black/5 rounded-[40px] px-6">
            <ImageIcon className="w-16 h-16 mx-auto text-black/20 mb-4 stroke-[1.5]" />
            <h4 className="text-2xl font-display font-black text-black/70">No photos poster yet in this category</h4>
            <p className="text-black/40 text-sm mt-2">Click the "Post New Photo" button to make the magic happen.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  layoutId={`photo-card-${photo.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group bg-white rounded-[32px] overflow-hidden border border-black/5 shadow-md hover:shadow-2xl transition-all cursor-pointer flex flex-col h-full relative"
                >
                  {/* Photo Container */}
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-black/10">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Floating pill for category */}
                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-black tracking-widest border border-white/40">
                      {photo.category}
                    </div>

                    {/* Quick Info Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="text-white flex items-center justify-between w-full">
                        <span className="text-xs font-bold tracking-wide flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5" /> {photo.camera.split(' ')[0]}
                        </span>
                        <span className="text-xs font-light">{photo.settings.slice(0, 15)}...</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-xl font-display font-black text-black group-hover:text-accent-pink transition-colors line-clamp-1">
                        {photo.title}
                      </h3>
                      <p className="text-black/60 text-xs mt-2 line-clamp-2 leading-relaxed font-sans">
                        {photo.caption}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/5">
                      {/* Location & Creator */}
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-black/40">
                        <MapPin className="w-3 h-3 text-accent-pink" /> {photo.location}
                      </span>

                      {/* Interactive Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleLike(photo.id, e)}
                          className={`p-2 rounded-full hover:bg-pink-50 transition-colors flex items-center gap-1.5 text-xs font-bold ${
                            userLikes.includes(photo.id) ? "text-accent-pink bg-pink-50/50" : "text-black/30 hover:text-accent-pink"
                          }`}
                          title={userLikes.includes(photo.id) ? "Unlike photo" : "Like photo"}
                        >
                          <Heart className={`w-4 h-4 transition-transform duration-300 ${
                            userLikes.includes(photo.id) ? "fill-accent-pink text-accent-pink scale-115" : "fill-transparent group-hover:scale-110"
                          }`} />
                          <span className={`${userLikes.includes(photo.id) ? "text-accent-pink font-black" : "text-black/60"} text-[11px]`}>
                            {photo.likes}
                          </span>
                        </button>
                        
                        {isOwner && (
                          <button
                            onClick={(e) => handleDelete(photo.id, e)}
                            className="p-2 rounded-full hover:bg-neutral-100 text-black/20 hover:text-destructive transition-colors ml-1"
                            title="Delete photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Dynamic Lightbox Dialog */}
        <AnimatePresence>
          {selectedPhoto && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[40px] max-w-5xl w-full overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:flex-row relative z-[101]"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-6 right-6 z-[110] bg-black/60 hover:bg-black/80 backdrop-blur-md text-white p-3 rounded-full hover:scale-105 transition-all outline-none"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content Left: Photo Image */}
                <div className="lg:w-3/5 bg-black flex items-center justify-center relative aspect-video lg:aspect-auto">
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[75vh] w-full object-contain"
                  />
                  
                  {/* Category Stamp */}
                  <div className="absolute bottom-6 left-6 bg-accent-pink text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
                    {selectedPhoto.category}
                  </div>
                </div>

                {/* Content Right: Photo Specs + Narrative */}
                <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-between bg-white overflow-y-auto max-h-[85vh] lg:max-h-[75 vh]">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-accent-pink tracking-widest uppercase mb-4">
                      <Sparkles className="w-4 h-4 animate-spin-slow" /> Photographer Skill Showcase
                    </div>
                    <h3 className="text-3xl font-display font-black text-black leading-tight mb-4">
                      {selectedPhoto.title}
                    </h3>
                    <p className="text-black/70 text-sm leading-relaxed mb-8">
                      {selectedPhoto.caption}
                    </p>
                  </div>

                  {/* Metadata and Gear Panel */}
                  <div className="space-y-4 pt-6 border-t border-black/5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 mb-3">Shot Specifications</h4>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                        <Camera className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-black/80">Camera System</p>
                        <p className="text-xs text-black/50">{selectedPhoto.camera}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
                        <Sliders className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-black/80">Exposure Settings</p>
                        <p className="text-xs text-black/50 font-mono text-[11px]">{selectedPhoto.settings}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-accent-pink">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-black/80">Location</p>
                        <p className="text-xs text-black/50">{selectedPhoto.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-black/50">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-black/80">Captured On</p>
                        <p className="text-xs text-black/50">{selectedPhoto.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-10 pt-6 border-t border-black/5">
                    <button
                      onClick={(e) => handleLike(selectedPhoto.id, e)}
                      className={`px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors duration-300 ${
                        userLikes.includes(selectedPhoto.id)
                          ? "bg-accent-pink text-white hover:bg-pink-600"
                          : "bg-pink-50 hover:bg-pink-100 text-accent-pink"
                      }`}
                    >
                      <Heart className={`w-4 h-4 transition-transform duration-300 ${
                        userLikes.includes(selectedPhoto.id) ? "fill-white text-white scale-110" : "fill-accent-pink"
                      }`} /> 
                      <span>{selectedPhoto.likes} {userLikes.includes(selectedPhoto.id) ? "Liked" : "Likes"}</span>
                    </button>
                    
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="px-6 py-3 bg-black text-white hover:bg-black/90 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300"
                    >
                      Close View
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Add Modal */}
        <AnimatePresence>
          {showAddModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[40px] max-w-2xl w-full p-8 md:p-12 shadow-2xl relative z-[101] my-8"
              >
                <div className="flex justify-between items-center mb-8 border-b border-black/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-accent-pink">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-black text-black">New Photography Post</h3>
                      <p className="text-xs text-black/40 font-bold uppercase tracking-wider">Showcase Devendra's creative skills</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-3 bg-neutral-100 hover:bg-neutral-200 text-black/60 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handlePost} className="space-y-6">
                  {/* Photo Input (Preset/File/Url options) */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-black/60">Photo Mode Option</label>
                    <div className="grid grid-cols-1 md:flex md:items-center gap-4">
                      {/* Local File Input */}
                      <label className="flex-1 border-2 border-dashed border-black/10 hover:border-accent-pink/50 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-neutral-50 hover:bg-pink-50/20 text-center">
                        <ImageIcon className="w-6 h-6 text-black/40 mb-1" />
                        <span className="text-xs font-bold text-black/70">Upload Local Image File</span>
                        <span className="text-[10px] text-black/40 mt-1">Accepts PNG, JPG</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>

                      {/* URL input */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-black/40">OR</span>
                          <input
                            type="text"
                            placeholder="Enter Unsplash Image URL..."
                            value={newUrl}
                            onChange={(e) => {
                              setNewUrl(e.target.value);
                              setFileBase64(null); // Clear file upload
                            }}
                            className="flex-1 w-full bg-neutral-50 border border-black/10 rounded-2xl p-4 text-xs font-medium placeholder-black/30 focus:border-accent-pink outline-none transition-all"
                          />
                        </div>
                        
                        {/* Preset options indicator */}
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-black/30 uppercase">Choose from high-quality presets:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {PRESET_IMAGE_OPTIONS.map((opt) => (
                              <button
                                key={opt.name}
                                type="button"
                                onClick={() => {
                                  setNewUrl(opt.url);
                                  setFileBase64(null);
                                }}
                                className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                                  newUrl === opt.url
                                    ? "bg-accent-pink text-white border-accent-pink"
                                    : "bg-neutral-50 border-black/10 text-black/60 hover:bg-neutral-100"
                                }`}
                              >
                                {opt.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Preview Area */}
                    {(fileBase64 || newUrl) && (
                      <div className="mt-3 relative rounded-2xl overflow-hidden aspect-[4/2] border border-black/5">
                        <img
                          src={fileBase64 || newUrl}
                          alt="preview"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setNewUrl("");
                            setFileBase64(null);
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Title & Caption */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-black/60">Creative Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Neon Horizon"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-neutral-50 border border-black/10 rounded-2xl p-4 text-sm font-semibold placeholder-black/30 focus:border-accent-pink outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-black/60">Category</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full bg-neutral-50 border border-black/10 rounded-2xl p-4 text-sm font-semibold text-black/70 focus:border-accent-pink outline-none cursor-pointer transition-all"
                      >
                        <option value="Street">Street</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Landscape">Landscape</option>
                        <option value="Portrait">Portrait</option>
                        <option value="Experimental">Experimental</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-black/60">The Story / Caption</label>
                    <textarea
                      placeholder="Share the artistic perspective, location feel, or inspiration..."
                      value={newCaption}
                      onChange={(e) => setNewCaption(e.target.value)}
                      rows={3}
                      className="w-full bg-neutral-50 border border-black/10 rounded-2xl p-4 text-sm font-medium placeholder-black/30 focus:border-accent-pink outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Technical Meta info */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-black/60">Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Kyoto, Japan"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        className="w-full bg-neutral-50 border border-black/10 rounded-2xl p-4 text-xs font-medium placeholder-black/30 focus:border-accent-pink outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-black/60">Camera Body</label>
                      <input
                        type="text"
                        placeholder="e.g. Fujifilm X-T5"
                        value={newCamera}
                        onChange={(e) => setNewCamera(e.target.value)}
                        className="w-full bg-neutral-50 border border-black/10 rounded-2xl p-4 text-xs font-medium placeholder-black/30 focus:border-accent-pink outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-black/60">Exposure Gear Spec</label>
                      <input
                        type="text"
                        placeholder="e.g. 35mm • f/2.0 • 1/125s"
                        value={newSettings}
                        onChange={(e) => setNewSettings(e.target.value)}
                        className="w-full bg-neutral-50 border border-black/10 rounded-2xl p-4 text-xs font-medium placeholder-black/30 focus:border-accent-pink outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-black/5">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false);
                      }}
                      className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-black text-white hover:bg-black/90 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                    >
                      Publish Post
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Owner Authentication Modal */}
        <AnimatePresence>
          {showAuthModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-[32px] max-w-md w-full p-8 shadow-2xl border border-black/5 relative overflow-hidden"
              >
                {/* Accent strip */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-accent-pink via-pink-500 to-amber-500" />
                
                <button
                  type="button"
                  onClick={() => {
                    setShowAuthModal(false);
                    setAuthError("");
                    setAuthPasscode("");
                    setPendingAction(null);
                  }}
                  className="absolute top-6 right-6 p-2 bg-neutral-100 hover:bg-neutral-200 text-black/60 rounded-full transition-colors outline-none"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="text-center mt-4">
                  <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-accent-pink mx-auto mb-4">
                    <KeyRound className="w-8 h-8 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-slate-900">Owner Verification</h3>
                  <p className="text-xs text-black/40 font-bold uppercase tracking-wider mt-1">Authorized Access Only</p>
                  
                  <p className="text-sm text-black/50 mt-4 leading-relaxed">
                    This gallery is configured so only <strong>Devendra</strong> can publish new photos or make changes. Please sign in with your passcode.
                  </p>
                </div>

                <form onSubmit={handleAuthSubmit} className="mt-8 space-y-4">
                  <div>
                    <label className="block text-left text-xs font-black uppercase tracking-wider text-black/60 mb-2">
                      Access Key / Passcode
                    </label>
                    <input
                      type="password"
                      autoFocus
                      required
                      placeholder="Enter owner passcode..."
                      value={authPasscode}
                      onChange={(e) => {
                        setAuthPasscode(e.target.value);
                        if (authError) setAuthError("");
                      }}
                      className="w-full bg-neutral-50 border border-black/10 rounded-2xl p-4 text-center text-lg font-black tracking-widest placeholder-black/30 placeholder-normal focus:border-accent-pink outline-none transition-all"
                    />
                  </div>

                  {authError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 bg-red-50 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 border border-red-100"
                    >
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{authError}</span>
                    </motion.div>
                  )}

                  {authSuccess && (
                     <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-emerald-600 bg-emerald-50 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 border border-emerald-100"
                     >
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Welcome back, Devendra!</span>
                     </motion.div>
                  )}

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={authSuccess}
                      className="w-full py-4 bg-black hover:bg-black/90 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {authSuccess ? "Verifying..." : "Unlock Access"}
                    </button>
                    
                    <div className="text-center mt-2.5 bg-neutral-50 rounded-xl p-3 border border-neutral-100 flex items-start gap-2 text-left">
                      <Info className="w-4 h-4 text-black/30 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-black/40 font-medium leading-relaxed">
                        Only the website owner (Devendra) possesses administrative privileges to add, delete, or manage showcase gallery items.
                      </p>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
