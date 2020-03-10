package test.atfuture.vogella;

//exercise vogella: getting start -- log Mar. 10. 2020
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;


public class CreateUserActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    // action function: button: onClick
    // retrieve text from editbox, show on toast message
    public  void onClick (View view) {
        EditText text = findViewById(R.id.username);
        String str = text.getText().toString();
        Toast.makeText( this, "User " + str + " create.", Toast.LENGTH_LONG).show();
    }
}

/*
    update log: Mar. 10, 2020
    exercise 11.
    rename class, remove views, add textview, editbox, button.
 */