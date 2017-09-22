#!D:\Perl\bin\perl.exe

 	use CGI; 
 	use strict;
  	use warnings;
  	use DBI;
  	use JSON;
	use Data::Dumper;
	
	print "Content-type: text/plain\n\n";
	use CGI::Carp qw(warningsToBrowser fatalsToBrowser); 
	my $cgi = CGI->new;
	my $desc = $cgi->param("desc");
	my $time = $cgi->param("time");
	my $date = $cgi->param("date");
	

  # Connecting to the database.
  my $dbconn = DBI->connect("DBI:mysql:database=appoinment_app;host=127.0.0.1",
                         "root", "root",
                         {'RaiseError' => 1});


  # Creating new table Appointment if not already exist
  
  $dbconn->do("CREATE TABLE IF NOT EXISTS Appoint (id INTEGER AUTO_INCREMENT PRIMARY KEY, time VARCHAR(255), date DATE, description VARCHAR(255))");

  # Inserting Appointment in table
  $dbconn->do("INSERT INTO Appoint(time, date, description) VALUES (?,?, ?)", undef, $time, $date, $desc);
  

  # Disconnecting from the database.
  $dbconn->disconnect();