import {Vec2} from "../../../util/vec2";

// VoiSite interface to include ID and be mutable
export interface VoiSite {
  x: number;
  y: number;
  id: number;
}

// VoiEdge interface to be mutable and mirror Voronoi.Edge
export interface VoiEdge {
  va: Vec2; // Start vertex
  vb: Vec2; // End vertex
  lSite: VoiSite; // Left site
  rSite: VoiSite; // Right site
}

// VoiHalfedge interface to be mutable and hold clipped segment
export interface VoiHalfedge {
  edge: VoiEdge;
  getStartpoint(): Vec2;
  getEndpoint(): Vec2;
  site: VoiSite; // Reference to the site of the cell this halfedge belongs to
  angle: number; // Angle of the halfedge
}

// VoiCell interface to hold VoiHalfedges
export interface VoiCell {
  site: VoiSite;
  halfedges: VoiHalfedge[];
}

// ClusteredCell will now extend our CustomCell
// This will be defined in IClusterAssigner.ts

export interface VoiDiagram {
  cells: VoiCell[];
}
