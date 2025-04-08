import { j as e } from "./motion-55a23653.js";
import { r as s, L as t } from "./react-c3d7d9ee.js";
import { S as a } from "./SEO-8193143e.js";
import { g as n } from "./enhanced-seo-4a9491f0.js";
import { B as o } from "./BreadcrumbNavigation-a76e09f9.js";
import { D as m, S as d, b as p, F as f } from "./ui-d40fa30f.js";

/**
 * ResourcesPage Component - Rebuilt for Safari compatibility
 */

// Resource categories and types
const categories = [
  { id: "all", label: "All Categories" },
  { id: "legislative", label: "Legislative" },
  { id: "transportation", label: "Transportation" },
  { id: "technology", label: "Technology" },
  { id: "healthcare", label: "Healthcare" },
  { id: "municipal", label: "Municipal Affairs" }
];

const resourceTypes = [
  { id: "all", label: "All Types" },
  { id: "guide", label: "Guides" },
  { id: "brief", label: "Policy Briefs" },
  { id: "report", label: "Reports" },
  { id: "calendar", label: "Calendars" }
];

// Resource data
const resources = [
  {
    id: "texas-leg-calendar-2025",
    title: "Texas Legislative Calendar 2025",
    description: "Comprehensive guide to the 89th Texas Legislative Session with important deadlines, committee meeting schedules, and key dates.",
    category: "legislative",
    type: "calendar",
    downloadUrl: "/files/texas-legislative-calendar-2025.html",
    date: "2024-12-15",
    featured: true,
    fileSize: "2.4 MB"
  },
  {
    id: "texas-leg-advocacy-guide",
    title: "Texas Legislative Advocacy Guide",
    description: "A comprehensive guide to effective advocacy during the Texas legislative session, including strategies, best practices, and key contacts.",
    category: "legislative",
    type: "guide",
    downloadUrl: "/files/texas-legislative-influence-guide-2025.html",
    date: "2024-11-20",
    featured: true,
    fileSize: "3.1 MB"
  },
  {
    id: "trans-funding-outlook",
    title: "Texas Transportation Funding Outlook",
    description: "Analysis of transportation funding trends, legislative priorities, and future funding projections for Texas infrastructure.",
    category: "transportation",
    type: "report",
    downloadUrl: "/files/texas-transportation-funding-outlook.html",
    date: "2024-10-18",
    fileSize: "1.8 MB"
  },
  {
    id: "telecom-regulatory-outlook",
    title: "Telecommunications Regulatory Outlook",
    description: "Overview of upcoming regulatory changes, legislative priorities, and industry trends affecting telecommunications in Texas.",
    category: "technology",
    type: "brief",
    downloadUrl: "/files/telecommunications-regulatory-outlook.html",
    date: "2024-09-22",
    fileSize: "1.5 MB"
  },
  {
    id: "healthcare-regulatory-changes",
    title: "Healthcare Regulatory Changes Impact Analysis",
    description: "Analysis of recent and upcoming healthcare regulatory changes and their potential impact on providers and patients in Texas.",
    category: "healthcare",
    type: "brief",
    downloadUrl: "/files/healthcare-regulatory-changes.html",
    date: "2024-09-05",
    fileSize: "2.2 MB"
  },
  {
    id: "municipal-advocacy-strategies",
    title: "Municipal Advocacy Strategies",
    description: "Effective advocacy strategies for cities and local governments to advance their legislative priorities in the Texas Legislature.",
    category: "municipal",
    type: "guide",
    downloadUrl: "/files/municipal-advocacy-strategies.html",
    date: "2024-08-15",
    fileSize: "2.7 MB"
  },
  {
    id: "water-infrastructure-funding",
    title: "Water Infrastructure Funding Guide",
    description: "Comprehensive guide to funding opportunities for water infrastructure projects in Texas, including state and federal programs.",
    category: "municipal",
    type: "guide",
    downloadUrl: "/files/water-infrastructure-funding.html",
    date: "2024-07-12",
    fileSize: "3.5 MB"
  },
  {
    id: "energy-grid-reliability",
    title: "Energy Grid Reliability Assessment",
    description: "Analysis of Texas energy grid reliability, regulatory framework, and policy recommendations for improving resilience.",
    category: "technology",
    type: "report",
    downloadUrl: "/files/energy-grid-reliability.html",
    date: "2024-06-20",
    fileSize: "4.1 MB"
  }
];

/**
 * ResourceCard Component
 */
const ResourceCard = ({ resource }) => {
  const getCategoryClass = (category) => {
    const classes = {
      legislative: "bg-blue-100 text-blue-800",
      transportation: "bg-green-100 text-green-800",
      technology: "bg-purple-100 text-purple-800",
      healthcare: "bg-red-100 text-red-800",
      municipal: "bg-amber-100 text-amber-800"
    };
    return classes[category] || "bg-slate-100 text-slate-800";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return e.jsxs("div", {
    className: "bg-white rounded-xl overflow-hidden shadow-md border border-slate-100 hover:shadow-lg transition-shadow flex flex-col",
    children: [
      e.jsxs("div", {
        className: "p-6 flex-grow",
        children: [
          e.jsxs("div", {
            className: "flex items-center mb-3",
            children: [
              e.jsx("span", {
                className: `text-xs px-2 py-1 rounded-full ${getCategoryClass(resource.category)}`,
                children: categories.find(c => c.id === resource.category)?.label || resource.category
              }),
              e.jsx("span", {
                className: "text-xs text-slate-500 ml-2",
                children: formatDate(resource.date)
              })
            ]
          }),
          e.jsx("h3", {
            className: "text-xl font-bold text-navy-900 mb-2",
            children: resource.title
          }),
          e.jsx("p", {
            className: "text-slate-600 mb-4",
            children: resource.description
          })
        ]
      }),
      e.jsx("div", {
        className: "px-6 pb-6 mt-auto",
        children: e.jsxs("a", {
          href: resource.downloadUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "btn btn-primary w-full flex items-center justify-center",
          children: [
            e.jsx(m, {
              size: 16,
              className: "mr-2"
            }),
            e.jsx("span", {
              children: "Download Resource"
            })
          ]
        })
      })
    ]
  }, resource.id);
};

/**
 * ResourceListItem Component
 */
const ResourceListItem = ({ resource }) => {
  const getCategoryClass = (category) => {
    const classes = {
      legislative: "bg-blue-100 text-blue-800",
      transportation: "bg-green-100 text-green-800",
      technology: "bg-purple-100 text-purple-800",
      healthcare: "bg-red-100 text-red-800",
      municipal: "bg-amber-100 text-amber-800"
    };
    return classes[category] || "bg-slate-100 text-slate-800";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return e.jsxs("div", {
    className: "bg-white rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col sm:flex-row",
    children: [
      e.jsxs("div", {
        className: "flex-grow p-6",
        children: [
          e.jsxs("div", {
            className: "flex flex-wrap items-center gap-2 mb-2",
            children: [
              e.jsx("span", {
                className: `text-xs px-2 py-0.5 rounded-full ${getCategoryClass(resource.category)}`,
                children: categories.find(c => c.id === resource.category)?.label || resource.category
              }),
              e.jsx("span", {
                className: "text-xs text-slate-500",
                children: formatDate(resource.date)
              }),
              resource.fileSize && e.jsx("span", {
                className: "text-xs text-slate-500",
                children: resource.fileSize
              })
            ]
          }),
          e.jsx("h3", {
            className: "text-lg font-bold text-navy-900 mb-2",
            children: resource.title
          }),
          e.jsx("p", {
            className: "text-slate-600 text-sm mb-4",
            children: resource.description
          })
        ]
      }),
      e.jsx("div", {
        className: "px-6 pb-6 sm:p-6 sm:pl-0 sm:ml-auto sm:flex sm:flex-col sm:justify-center",
        children: e.jsxs("a", {
          href: resource.downloadUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "btn btn-primary whitespace-nowrap flex items-center",
          children: [
            e.jsx(m, {
              size: 16,
              className: "mr-2"
            }),
            e.jsx("span", {
              children: "Download"
            })
          ]
        })
      })
    ]
  }, resource.id);
};

/**
 * Main ResourcesPage Component
 */
const ResourcesPage = () => {
  // State hooks with simplified management
  const [selectedCategory, setSelectedCategory] = s.useState("all");
  const [selectedType, setSelectedType] = s.useState("all");
  const [searchQuery, setSearchQuery] = s.useState("");
  const [sortOrder, setSortOrder] = s.useState("newest");
  const [showFilters, setShowFilters] = s.useState(false);

  // Get featured resources
  const featuredResources = resources.filter(r => r.featured);

  // Filter and sort resources
  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    const matchesSearch = searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesType && matchesSearch;
  }).sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOrder === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedType("all");
  };

  return e.jsxs("div", {
    className: "pt-16",
    children: [
      // SEO Component
      e.jsx(a, {
        ...n({
          pageType: "resources",
          title: "Legislative Resources | Capitol Insights",
          description: "Access our collection of legislative resources, policy briefs, guidance documents, and reports on Texas government affairs and regulatory matters.",
          image: "/images/capitol-background.jpg"
        })
      }),

      // Hero Section
      e.jsxs("section", {
        className: "pt-20 pb-16 bg-navy-900 relative",
        children: [
          e.jsx("div", {
            className: "absolute inset-0 bg-capitol bg-cover bg-center opacity-20"
          }),
          e.jsx("div", {
            className: "absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/95 to-navy-900"
          }),
          e.jsx("div", {
            className: "container relative z-10",
            children: e.jsxs("div", {
              className: "max-w-3xl",
              children: [
                e.jsx("span", {
                  className: "inline-block px-3 py-1 bg-gold-600/20 text-gold-200 rounded-full text-sm font-medium mb-4 backdrop-blur-sm",
                  children: "RESOURCES CENTER"
                }),
                e.jsxs("h1", {
                  className: "text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4",
                  children: [
                    "Legislative Resources &",
                    e.jsx("br", {}),
                    "Policy Materials"
                  ]
                }),
                e.jsx("p", {
                  className: "text-lg sm:text-xl text-white/90 mb-8",
                  children: "Access guides, policy briefs, calendars, and reports to help navigate the complex landscape of Texas government affairs."
                }),
                e.jsxs("div", {
                  className: "relative max-w-xl",
                  children: [
                    e.jsx("div", {
                      className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                      children: e.jsx(d, {
                        size: 20,
                        className: "text-slate-400"
                      })
                    }),
                    e.jsx("input", {
                      type: "text",
                      value: searchQuery,
                      onChange: e => setSearchQuery(e.target.value),
                      placeholder: "Search resources by keyword...",
                      className: "block w-full pl-10 pr-4 py-3 border-0 rounded-lg shadow-md focus:ring-2 focus:ring-gold-500"
                    })
                  ]
                })
              ]
            })
          })
        ]
      }),

      // Breadcrumb Navigation
      e.jsx("div", {
        className: "bg-slate-50 border-b border-slate-200",
        children: e.jsx("div", {
          className: "container py-3",
          children: e.jsx(o, {
            items: [
              { name: "Home", path: "/" },
              { name: "Resources", path: "/resources", isLast: true }
            ]
          })
        })
      }),

      // Featured Resources Section
      featuredResources.length > 0 && !searchQuery && selectedCategory === "all" && selectedType === "all" && e.jsx("section", {
        className: "py-12 bg-slate-50",
        children: e.jsxs("div", {
          className: "container",
          children: [
            e.jsx("h2", {
              className: "text-2xl font-bold text-navy-900 mb-6",
              children: "Featured Resources"
            }),
            e.jsx("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-6",
              children: featuredResources.map(resource => 
                e.jsx(ResourceCard, { 
                  resource: resource
                }, resource.id)
              )
            })
          ]
        })
      }),

      // Main Resources Section
      e.jsx("section", {
        className: "py-12",
        children: e.jsx("div", {
          className: "container",
          children: e.jsxs("div", {
            className: "flex flex-col lg:flex-row gap-8",
            children: [
              // Filters Sidebar
              e.jsx("div", {
                className: "w-full lg:w-64 lg:shrink-0",
                children: e.jsxs("div", {
                  className: "lg:sticky lg:top-24",
                  children: [
                    e.jsxs("div", {
                      className: "flex items-center justify-between mb-6",
                      children: [
                        e.jsx("h2", {
                          className: "text-xl font-bold text-navy-900",
                          children: "Filters"
                        }),
                        e.jsx("button", {
                          className: "lg:hidden p-2 text-slate-500 hover:text-navy-800 rounded-md",
                          onClick: () => setShowFilters(!showFilters),
                          children: showFilters ? "Hide Filters" : "Show Filters"
                        })
                      ]
                    }),
                    e.jsxs("div", {
                      className: "space-y-6 " + (showFilters ? "block" : "hidden lg:block"),
                      children: [
                        // Sort Options
                        e.jsxs("div", {
                          children: [
                            e.jsx("h3", {
                              className: "text-sm font-semibold text-navy-800 mb-3",
                              children: "Sort By"
                            }),
                            e.jsxs("div", {
                              className: "space-y-2",
                              children: [
                                e.jsx("button", {
                                  onClick: () => setSortOrder("newest"),
                                  className: "flex items-center w-full px-3 py-2 rounded-md " + 
                                    (sortOrder === "newest" ? "bg-slate-100 text-navy-800 font-medium" : "text-slate-600 hover:bg-slate-50"),
                                  children: "Newest First"
                                }),
                                e.jsx("button", {
                                  onClick: () => setSortOrder("oldest"),
                                  className: "flex items-center w-full px-3 py-2 rounded-md " + 
                                    (sortOrder === "oldest" ? "bg-slate-100 text-navy-800 font-medium" : "text-slate-600 hover:bg-slate-50"),
                                  children: "Oldest First"
                                }),
                                e.jsx("button", {
                                  onClick: () => setSortOrder("alphabetical"),
                                  className: "flex items-center w-full px-3 py-2 rounded-md " + 
                                    (sortOrder === "alphabetical" ? "bg-slate-100 text-navy-800 font-medium" : "text-slate-600 hover:bg-slate-50"),
                                  children: "Alphabetical"
                                })
                              ]
                            })
                          ]
                        }),
                        
                        // Categories Filter
                        e.jsxs("div", {
                          children: [
                            e.jsx("h3", {
                              className: "text-sm font-semibold text-navy-800 mb-3",
                              children: "Categories"
                            }),
                            e.jsx("div", {
                              className: "space-y-2",
                              children: categories.map(category => 
                                e.jsx("button", {
                                  onClick: () => setSelectedCategory(category.id),
                                  className: "flex items-center w-full px-3 py-2 rounded-md " + 
                                    (selectedCategory === category.id ? "bg-slate-100 text-navy-800 font-medium" : "text-slate-600 hover:bg-slate-50"),
                                  children: category.label
                                }, category.id)
                              )
                            })
                          ]
                        }),
                        
                        // Resource Types Filter
                        e.jsxs("div", {
                          children: [
                            e.jsx("h3", {
                              className: "text-sm font-semibold text-navy-800 mb-3",
                              children: "Resource Type"
                            }),
                            e.jsx("div", {
                              className: "space-y-2",
                              children: resourceTypes.map(type => 
                                e.jsx("button", {
                                  onClick: () => setSelectedType(type.id),
                                  className: "flex items-center w-full px-3 py-2 rounded-md " + 
                                    (selectedType === type.id ? "bg-slate-100 text-navy-800 font-medium" : "text-slate-600 hover:bg-slate-50"),
                                  children: type.label
                                }, type.id)
                              )
                            })
                          ]
                        })
                      ]
                    })
                  ]
                })
              }),
              
              // Resources List
              e.jsxs("div", {
                className: "flex-grow",
                children: [
                  // Filter Status and Results Count
                  (searchQuery || selectedCategory !== "all" || selectedType !== "all") ? 
                    e.jsxs("div", {
                      className: "mb-6",
                      children: [
                        e.jsxs("h2", {
                          className: "text-2xl font-bold text-navy-900 mb-2",
                          children: [
                            filteredResources.length,
                            " ",
                            filteredResources.length === 1 ? "Resource" : "Resources",
                            " Found"
                          ]
                        }),
                        e.jsx("button", {
                          onClick: clearFilters,
                          className: "text-sm text-gold-600 hover:text-gold-700",
                          children: "Clear All Filters"
                        })
                      ]
                    }) : 
                    e.jsx("h2", {
                      className: "text-2xl font-bold text-navy-900 mb-6",
                      children: "All Resources"
                    }),
                  
                  // Resources List
                  e.jsx("div", {
                    className: "space-y-4",
                    children: filteredResources.map(resource => 
                      e.jsx(ResourceListItem, {
                        resource: resource
                      }, resource.id)
                    )
                  })
                ]
              })
            ]
          })
        })
      }),

      // Custom Research Section
      e.jsx("section", {
        className: "py-12 bg-slate-50",
        children: e.jsx("div", {
          className: "container",
          children: e.jsx("div", {
            className: "bg-white rounded-2xl shadow-lg overflow-hidden",
            children: e.jsx("div", {
              className: "p-8 sm:p-10 md:p-12",
              children: e.jsxs("div", {
                className: "max-w-3xl",
                children: [
                  e.jsx("h2", {
                    className: "text-2xl sm:text-3xl font-bold text-navy-900 mb-4",
                    children: "Need Customized Research or Analysis?"
                  }),
                  e.jsx("p", {
                    className: "text-slate-600 mb-6",
                    children: "Our team provides tailored research, analysis, and strategic recommendations specific to your organization's needs and priorities."
                  }),
                  e.jsxs("div", {
                    className: "flex flex-col sm:flex-row gap-4",
                    children: [
                      e.jsx(t, {
                        to: "/contact",
                        className: "btn btn-primary",
                        children: "Request Custom Research"
                      }),
                      e.jsx(t, {
                        to: "/services",
                        className: "btn bg-slate-200 hover:bg-slate-300 text-navy-800",
                        children: "View Our Services"
                      })
                    ]
                  })
                ]
              })
            })
          })
        })
      })
    ]
  });
};

export default ResourcesPage;
