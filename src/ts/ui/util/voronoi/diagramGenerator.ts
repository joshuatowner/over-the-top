import { Voronoi, Cell, Halfedge, Diagram } from 'voronoijs';
import { Size } from '../../../util/vec2';
import {VoiCell, VoiEdge, VoiHalfedge, VoiSite, VoiDiagram} from "./types";

interface Site {
  x: number;
  y: number;
  id: number;
}

interface VoronoiDiagramOptions {
  numSites: number;
  width: number;
  height: number;
  relaxationIterations: number;
  centerX: number;
  centerY: number;
  radius: number;
  numBoundarySites: number;
}

function generateInitialSites(numSites: number, centerX: number, centerY: number, radius: number): Site[] {
  const sites: Site[] = [];
  for (let i = 0; i < numSites; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const r = Math.sqrt(Math.random()) * radius;
    sites.push({
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
      id: i,
    });
  }
  return sites;
}

function addBoundarySites(sites: Site[], numSites: number, centerX: number, centerY: number, radius: number, numBoundarySites: number): void {
  const boundaryRadius = radius * 1.2; // Slightly larger than the main circle
  for (let i = 0; i < numBoundarySites; i++) {
    const angle = (i / numBoundarySites) * 2 * Math.PI;
    sites.push({
      x: centerX + boundaryRadius * Math.cos(angle),
      y: centerY + boundaryRadius * Math.sin(angle),
      id: numSites + i,
    });
  }
}

function performRelaxation(initialSites: Site[], bbox: { xl: number; yt: number; xr: number; yb: number; }, relaxationIterations: number): Diagram {
  let sites = [...initialSites];
  const voronoi = new Voronoi();
  let diagram = voronoi.compute(sites, bbox);

  for (let i = 0; i < relaxationIterations; i++) {
    const newSites: Site[] = [];
    diagram.cells.forEach((cell: Cell) => {
      if (cell.halfedges.length > 0) {
        let x = 0, y = 0, numPoints = 0;
        const polygon = cell.halfedges.map((halfedge: Halfedge) => halfedge.edge.va);
        for (let j = 0; j < polygon.length; j++) {
          const p1 = polygon[j];
          const p2 = polygon[(j + 1) % polygon.length];
          const f = p1.x * p2.y - p2.x * p1.y;
          x += (p1.x + p2.x) * f;
          y += (p1.y + p2.y) * f;
          numPoints += f;
        }
        if (numPoints !== 0) {
          newSites.push({ x: x / (3 * numPoints), y: y / (3 * numPoints), id: cell.site.id });
        } else {
          newSites.push(cell.site); // Keep original site if centroid cannot be calculated
        }
      } else {
        newSites.push(cell.site); // Keep original site if no halfedges
      }
    });
    sites = newSites;
    diagram = voronoi.compute(sites, bbox);
  }

  return diagram;
}

function mapVoronoiDiagramToVoiDiagram(diagram: Diagram): VoiDiagram {
  const voiCells: VoiCell[] = diagram.cells.map(cell => {
    const voiHalfedges: VoiHalfedge[] = cell.halfedges.map(halfedge => {
      const voiEdge: VoiEdge = {
        va: { x: halfedge.edge.va.x, y: halfedge.edge.va.y },
        vb: { x: halfedge.edge.vb.x, y: halfedge.edge.vb.y },
        lSite: { x: halfedge.edge.lSite?.x, y: halfedge.edge.lSite?.y, id: halfedge.edge.lSite?.id },
        rSite: { x: halfedge.edge.rSite?.x, y: halfedge.edge.rSite?.y, id: halfedge.edge.rSite?.id },
      };
      return {
        edge: voiEdge,
        getStartpoint: () => ({ x: halfedge.getStartpoint().x, y: halfedge.getStartpoint().y }),
        getEndpoint: () => ({ x: halfedge.getEndpoint().x, y: halfedge.getEndpoint().y }),
        site: { x: halfedge.site.x, y: halfedge.site.y, id: halfedge.site.id },
        angle: halfedge.angle,
      };
    });
    return {
      site: { x: cell.site.x, y: cell.site.y, id: cell.site.id },
      halfedges: voiHalfedges,
    };
  });

  return { cells: voiCells };
}

export function generateVoronoiDiagram(options: VoronoiDiagramOptions): VoiDiagram {
  const { numSites, width, height, relaxationIterations, centerX, centerY, radius, numBoundarySites } = options;

  let sites = generateInitialSites(numSites, centerX, centerY, radius);
  addBoundarySites(sites, numSites, centerX, centerY, radius, numBoundarySites);

  const bbox = { xl: 0, yt: 0, xr: width, yb: height };

  const voronoiDiagram = performRelaxation(sites, bbox, relaxationIterations);

  return mapVoronoiDiagramToVoiDiagram(voronoiDiagram);
}

// Helper function for line-circle intersection
// Returns intersection points of a line segment (p1, p2) with a circle (center, radius)
// Adapted from: https://stackoverflow.com/questions/10731043/find-points-of-intersection-of-a-line-and-a-circle-in-javascript
function getLineCircleIntersection(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  center: { x: number; y: number },
  radius: number
): { x: number; y: number }[] {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const A = dx * dx + dy * dy;
  const B = 2 * (dx * (p1.x - center.x) + dy * (p1.y - center.y));
  const C = (p1.x - center.x) * (p1.x - center.x) + (p1.y - center.y) * (p1.y - center.y) - radius * radius;

  const det = B * B - 4 * A * C;
  const intersections: { x: number; y: number }[] = [];

  if (det >= 0) {
    const t1 = (-B + Math.sqrt(det)) / (2 * A);
    const t2 = (-B - Math.sqrt(det)) / (2 * A);

    if (t1 >= 0 && t1 <= 1) {
      intersections.push({ x: p1.x + t1 * dx, y: p1.y + t1 * dy });
    }
    if (t2 >= 0 && t2 <= 1) {
      // Avoid adding the same point twice if t1 == t2
      if (t1 !== t2) {
        intersections.push({ x: p1.x + t2 * dx, y: p1.y + t2 * dy });
      }
    }
  }
  return intersections;
}

export function filterOuterCells(
  diagram: VoiDiagram,
  centerX: number,
  centerY: number,
  visibleRadius: number,
  outerThreshold: number // outerThreshold might not be needed with this approach
): VoiDiagram { // Changed return type to VoiDiagram
  const filteredCells: VoiCell[] = [];
  const radiusSq = visibleRadius * visibleRadius;

  const totalCells = diagram.cells.length; // Total cells before filtering

  diagram.cells.forEach(cell => {
    let allVerticesInside = true;
    for (const halfedge of cell.halfedges) {
      const startPoint = halfedge.getStartpoint();
      const endPoint = halfedge.getEndpoint();

      const distStartSq = Math.pow(startPoint.x - centerX, 2) + Math.pow(startPoint.y - centerY, 2);
      const distEndSq = Math.pow(endPoint.x - centerX, 2) + Math.pow(endPoint.y - centerY, 2);

      if (distStartSq > radiusSq || distEndSq > radiusSq) {
        allVerticesInside = false;
        break;
      }
    }

    if (allVerticesInside) {
      filteredCells.push(cell);
    }
  });

  

  return { cells: filteredCells }; // Wrapped in VoiDiagram
}
