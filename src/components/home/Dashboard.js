import React from "react";
import {
  DashboardContainer,
  MapSection,
  InfoSection,
  WidgetGrid,
} from "../../styles/DashboardStyles";
import GoogleMapView from "../tracking/GoogleMapView";
import { Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <DashboardContainer>
      {/* Map Section*/}
      <MapSection>
        <GoogleMapView />
      </MapSection>

      {/* Widgets & Tracking Info */}
      <InfoSection>
        <WidgetGrid>
          <Card sx={{ bgcolor: "#1976d2", color: "white", minWidth: 180 }}>
            <CardContent>
              <Typography variant="h6"> Active Device</Typography>
              <Typography variant="h4">15</Typography>
            </CardContent>
          </Card>

          <Card sx={{ bgcolor: "#388e3c", color: "white", minWidth: 180 }}>
            <CardContent>
              <Typography variant="h6"> Device Moving </Typography>
              <Typography variant="h4">7</Typography>
            </CardContent>
          </Card>

          <Card sx={{ bgcolor: "#d32f2f", color: "white", minWidth: 180 }}>
            <CardContent>
              <Typography variant="h6"> Offline Devices </Typography>
              <Typography variant=" h4">5</Typography>
            </CardContent>
          </Card>
        </WidgetGrid>
      </InfoSection>
    </DashboardContainer>
  );
};

export default Dashboard;
