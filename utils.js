/**
 * ghostPack shared utilities
 * Marker and common functions used by pack.html and extract.html
 */

// Use a more robust marker: MAGIC + VERSION + LENGTH prefix
// This avoids collision with binary PDF content
const MARKER = {
  magic: new Uint8Array([71, 72, 79, 83, 84, 80, 65, 67, 75]), // "GHOSTPACK" in ASCII
  version: 1,
  // Format: MAGIC (9 bytes) + VERSION (1 byte) = 10 bytes header
  // Followed by 4-byte little-endian length
  
  encode() {
    const header = new Uint8Array(14);
    header.set(this.magic, 0);
    header[9] = this.version;
    // Length bytes will be added by caller
    return header;
  },
  
  getHeaderSize() {
    return 14; // 9 (magic) + 1 (version) + 4 (length placeholder)
  },
};

/**
 * Download data as a file
 */
function download(data, filename) {
  const blob = new Blob([data]);
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  // Clean up
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * Show error message to user
 */
function showError(message) {
  const errorDiv = document.getElementById("error");
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    errorDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } else {
    alert(`Error: ${message}`);
  }
}

/**
 * Clear error message
 */
function clearError() {
  const errorDiv = document.getElementById("error");
  if (errorDiv) {
    errorDiv.textContent = "";
    errorDiv.style.display = "none";
  }
}

/**
 * Set loading state
 */
function setLoading(isLoading) {
  const button = document.querySelector("button");
  if (button) {
    button.disabled = isLoading;
    button.textContent = isLoading ? "Processing..." : button.dataset.originalText;
  }
}

/**
 * Format file size for display
 */
function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}
