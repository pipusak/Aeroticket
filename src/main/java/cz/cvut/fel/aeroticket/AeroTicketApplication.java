package cz.cvut.fel.aeroticket;




import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@SuppressWarnings("SpellCheckingInspection")
@ApplicationPath("api")
public class AeroTicketApplication extends Application {

    public static ListOfResources listOfResources;


    public static void main(String... args) throws Exception {
        ClassLoader classLoader = AeroTicketApplication.class.getClassLoader();
        URL stageConfig = classLoader.getResource("project-stages.yml");


    }

        @Override
        public Set<Class<?>> getClasses() {
            Set<Class<?>> resources = new java.util.HashSet<>();
            AeroTicketApplication.listOfResources = new ListOfResources();
            System.out.println("REST configuration starting: getClasses()");

            fillResourceList(AeroTicketApplication.listOfResources);
            addRestResourceClasses(resources);


            System.out.println("REST configuration ended successfully.");
            return resources;
        }


    private void fillResourceList(ListOfResources listOfResources){
        String resourcesBase = "api";
        listOfResources.add(resourcesBase+"/destination");
        listOfResources.add(resourcesBase+"/flight");
        listOfResources.add(resourcesBase+"/reservation");
        listOfResources.add(resourcesBase+"/client");
        listOfResources.add(resourcesBase+"/ping");
        listOfResources.add(resourcesBase+"/ping");
        listOfResources.add(resourcesBase+"/banner");

    }

    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(cz.cvut.fel.aeroticket.controller.DestinationController.class);
        resources.add(cz.cvut.fel.aeroticket.controller.FlightController.class);
        resources.add(cz.cvut.fel.aeroticket.controller.ClientController.class);
        resources.add(cz.cvut.fel.aeroticket.controller.PingController.class);
        resources.add(cz.cvut.fel.aeroticket.controller.ReservationController.class);
        resources.add(cz.cvut.fel.aeroticket.banner.BannerController.class);
    }
}
class ListOfResources {
    ArrayList<String> resources;
    public ListOfResources(){
        resources = new ArrayList<>();
    }

    public void add(String resource){
        this.resources.add(resource);
    }

    public List<String> getResources(){
        return resources;
    }
}
