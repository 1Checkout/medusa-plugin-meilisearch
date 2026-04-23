"use strict";
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const ui = require("@medusajs/ui");
const reactQuery = require("@tanstack/react-query");
const adminSdk = require("@medusajs/admin-sdk");
const Medusa = require("@medusajs/js-sdk");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const Medusa__default = /* @__PURE__ */ _interopDefault(Medusa);
const sdk = new Medusa__default.default({
  baseUrl: __BACKEND_URL__ || "/",
  auth: {
    type: "session"
  }
});
const SyncPage = () => {
  const [semanticSearchEnabled, setSemanticSearchEnabled] = react.useState(false);
  const [semanticRatio, setSemanticRatio] = react.useState(0.5);
  const [searchQuery, setSearchQuery] = react.useState("jeans");
  const {
    data: vectorStatus,
    isLoading: statusLoading,
    error: statusError,
    refetch: refetchStatus
  } = reactQuery.useQuery({
    queryKey: ["meilisearch-vector-status"],
    queryFn: async () => sdk.client.fetch("/admin/meilisearch/vector-status"),
    retry: 2,
    staleTime: 3e4
    // Consider data stale after 30 seconds
  });
  const { mutate: syncData, isPending: syncPending } = reactQuery.useMutation({
    mutationFn: () => sdk.client.fetch("/admin/meilisearch/sync", {
      method: "POST"
    }),
    onSuccess: () => {
      ui.toast.success("Successfully triggered data sync to Meilisearch");
    },
    onError: (err) => {
      console.error(err);
      ui.toast.error("Failed to sync data to Meilisearch");
    }
  });
  const { mutate: searchProducts, isPending: searchProductsPending } = reactQuery.useMutation({
    mutationFn: async () => {
      if (!searchQuery.trim()) {
        throw new Error("Search query cannot be empty");
      }
      return sdk.client.fetch("/admin/meilisearch/products-hits", {
        method: "POST",
        body: {
          query: searchQuery.trim(),
          semanticSearch: semanticSearchEnabled,
          semanticRatio,
          limit: 5,
          offset: 0
        }
      });
    },
    onSuccess: (data) => {
      const hybridInfo = data.hybridSearch ? ` (hybrid search with ratio ${data.semanticRatio})` : "";
      ui.toast.success(`Search successful. Found ${data.hits.length} products${hybridInfo}`);
    },
    onError: (err) => {
      console.error("Search error:", err);
      ui.toast.error(err.message || "Search failed");
    }
  });
  const { mutate: searchCategories, isPending: searchCategoriesPending } = reactQuery.useMutation({
    mutationFn: async () => {
      if (!searchQuery.trim()) {
        throw new Error("Search query cannot be empty");
      }
      return sdk.client.fetch("/admin/meilisearch/categories-hits", {
        method: "POST",
        body: {
          query: searchQuery.trim(),
          semanticSearch: semanticSearchEnabled,
          semanticRatio,
          limit: 5,
          offset: 0
        }
      });
    },
    onSuccess: (data) => {
      const hybridInfo = data.hybridSearch ? ` (hybrid search with ratio ${data.semanticRatio})` : "";
      ui.toast.success(`Search successful. Found ${data.hits.length} categories${hybridInfo}`);
    },
    onError: (err) => {
      console.error("Search error:", err);
      ui.toast.error(err.message || "Search failed");
    }
  });
  const handleSync = () => {
    syncData();
  };
  const handleSearchProducts = () => {
    searchProducts();
  };
  const handleSearchCategories = () => {
    searchCategories();
  };
  return /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-y-6", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "Meilisearch Configuration" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "text-gray-500 mt-2", children: "Manage your Meilisearch index synchronization and AI-powered semantic search settings." })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "border border-gray-200 rounded-lg p-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h2", children: "AI-Powered Semantic Search" }),
          statusLoading ? /* @__PURE__ */ jsxRuntime.jsx(ui.Badge, { children: "Loading..." }) : statusError ? /* @__PURE__ */ jsxRuntime.jsx(ui.Badge, { color: "red", children: "Error" }) : (vectorStatus == null ? void 0 : vectorStatus.enabled) ? /* @__PURE__ */ jsxRuntime.jsx(ui.Badge, { color: "green", children: "Enabled" }) : /* @__PURE__ */ jsxRuntime.jsx(ui.Badge, { color: "grey", children: "Disabled" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { variant: "secondary", size: "small", onClick: () => refetchStatus(), isLoading: statusLoading, children: "Refresh Status" })
      ] }),
      statusError && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 rounded-md", children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Text, { className: "text-red-800 text-sm", children: [
        "Failed to load vector search status: ",
        statusError.message
      ] }) }),
      (vectorStatus == null ? void 0 : vectorStatus.enabled) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "text-sm font-medium text-gray-700", children: "Provider" }),
          /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "text-sm text-gray-600", children: vectorStatus.provider || "Not specified" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "text-sm font-medium text-gray-700", children: "Model" }),
          /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "text-sm text-gray-600", children: vectorStatus.model || "Not specified" })
        ] }),
        vectorStatus.dimensions && /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "text-sm font-medium text-gray-700", children: "Vector Dimensions" }),
          /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "text-sm text-gray-600", children: vectorStatus.dimensions })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "text-sm font-medium text-gray-700", children: "Embedding Fields" }),
          /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "text-sm text-gray-600", children: vectorStatus.embeddingFields.join(", ") })
        ] })
      ] }),
      (vectorStatus == null ? void 0 : vectorStatus.enabled) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "font-medium", children: "Enable Semantic Search in Tests" }),
            /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "text-sm text-gray-500", children: "Use AI-powered semantic search for better results" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(ui.Switch, { checked: semanticSearchEnabled, onCheckedChange: setSemanticSearchEnabled })
        ] }),
        semanticSearchEnabled && /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(ui.Text, { className: "font-medium mb-2", children: [
            "Semantic Ratio: ",
            semanticRatio
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "text-sm text-gray-500 mb-3", children: "0.0 = Pure keyword search, 1.0 = Pure semantic search, 0.5 = Balanced hybrid" }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              ui.Input,
              {
                type: "range",
                min: "0",
                max: "1",
                step: "0.1",
                value: semanticRatio,
                onChange: (e) => setSemanticRatio(parseFloat(e.target.value)),
                className: "flex-1",
                "aria-label": "Semantic search ratio",
                "aria-describedby": "semantic-ratio-description"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm text-gray-700", children: semanticRatio.toFixed(1) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { id: "semantic-ratio-description", className: "sr-only", children: "Adjust the balance between keyword and semantic search from 0 to 1" })
        ] })
      ] }),
      !(vectorStatus == null ? void 0 : vectorStatus.enabled) && /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "text-gray-500", children: "Vector search is not configured. Add vectorSearch configuration to your plugin options to enable AI-powered semantic search." })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "border border-gray-200 rounded-lg p-6", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center gap-3 mb-4", children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h2", children: "Data Synchronization" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Text, { className: "text-gray-500 mb-4", children: [
        "Manually trigger synchronization of your product catalog with Meilisearch.",
        (vectorStatus == null ? void 0 : vectorStatus.enabled) && " This will also generate embeddings for semantic search."
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { onClick: handleSync, isLoading: syncPending, variant: "primary", children: "Sync Now" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "border border-gray-200 rounded-lg p-6", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center gap-3 mb-4", children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h2", children: "Search Testing" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Text, { className: "text-gray-500 mb-4", children: [
        "Test your products search configuration with a custom query.",
        (vectorStatus == null ? void 0 : vectorStatus.enabled) && " You can test both traditional keyword search and AI-powered semantic search."
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "text-sm font-medium text-gray-700 mb-2", children: "Search Query" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            ui.Input,
            {
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              placeholder: "Enter search query (e.g., 'blue shirt', 'comfortable clothing')",
              className: "w-full",
              "aria-label": "Search query input",
              "aria-describedby": "search-query-help"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("div", { id: "search-query-help", className: "sr-only", children: "Enter a search term to test the search functionality" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            ui.Button,
            {
              onClick: handleSearchProducts,
              isLoading: searchProductsPending,
              variant: "secondary",
              disabled: !searchQuery.trim(),
              children: "Search Products"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            ui.Button,
            {
              onClick: handleSearchCategories,
              isLoading: searchCategoriesPending,
              variant: "secondary",
              disabled: !searchQuery.trim(),
              children: "Search Categories"
            }
          ),
          (vectorStatus == null ? void 0 : vectorStatus.enabled) && /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "text-sm text-gray-500 self-center", children: semanticSearchEnabled ? `Using hybrid search (${Math.round(semanticRatio * 100)}% semantic)` : "Using keyword search only" })
        ] })
      ] })
    ] })
  ] }) });
};
const config = adminSdk.defineRouteConfig({
  label: "Meilisearch"
});
const widgetModule = { widgets: [] };
const routeModule = {
  routes: [
    {
      Component: SyncPage,
      path: "/settings/meilisearch"
    }
  ]
};
const menuItemModule = {
  menuItems: [
    {
      label: config.label,
      icon: void 0,
      path: "/settings/meilisearch",
      nested: void 0,
      rank: void 0,
      translationNs: void 0
    }
  ]
};
const formModule = { customFields: {} };
const displayModule = {
  displays: {}
};
const i18nModule = { resources: {} };
const plugin = {
  widgetModule,
  routeModule,
  menuItemModule,
  formModule,
  displayModule,
  i18nModule
};
module.exports = plugin;
