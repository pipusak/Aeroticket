package cz.cvut.fel.aeroticket.validation.dto;

public class ValidationResult {

    private final boolean valid;
    private final String message;

    public ValidationResult(boolean valid, String message) {
        this.valid = valid;
        this.message = message;
    }

    public boolean isValid() {
        return valid;
    }

    public String getMessage() {
        return message;
    }

    public static ValidationResult succeed() {
        return new ValidationResult(true, null);
    }
    
    public static ValidationResult failed(String message) {
        return new ValidationResult(false, message);
    }

}
