import http from 'k6/http';
import { check } from 'k6';

// Test configuration
export const options = {
  thresholds: {
    http_req_duration: ['p(99) < 5000'],
  },
  stages: [{ duration: '30s', target: 5000 }],
};

// Simulated user behavior
export default function () {
  let req = http.get('http://host.docker.internal:3333/');
  check(req, { 'status was 200': (r) => r.status === 200 });
}
